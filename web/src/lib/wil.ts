import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface WilMeta {
  slug: string;
  week: number;
  title: string;
  excerpt?: string;
}

export interface WilDetail extends WilMeta {
  content: string;
}

function getWilDirPath(): string {
  return path.join(process.cwd(), "..", "WIL");
}

function extractExcerpt(content: string, maxLength: number = 150): string {
  const lines = content.split("\n");
  let excerptText = "";

  for (const line of lines) {
    if (line.startsWith("## ")) {
      excerptText = line.substring(3).trim();
      break;
    }
    if (line.trim() && !line.startsWith("#")) {
      excerptText = line.trim();
      break;
    }
  }

  if (excerptText.length > maxLength) {
    return excerptText.substring(0, maxLength) + "...";
  }
  return excerptText;
}

export function getAllWilSlugs(): string[] {
  const wilDir = getWilDirPath();
  const slugs: string[] = [];

  if (!fs.existsSync(wilDir)) {
    return slugs;
  }

  const files = fs.readdirSync(wilDir);

  for (const file of files) {
    if (file.endsWith(".md")) {
      const slug = file.replace(".md", "");
      slugs.push(slug);
    }
  }

  return slugs;
}

export function getAllWilMeta(): WilMeta[] {
  const wilDir = getWilDirPath();
  const wils: WilMeta[] = [];

  if (!fs.existsSync(wilDir)) {
    return wils;
  }

  const files = fs.readdirSync(wilDir);

  for (const file of files) {
    if (file.endsWith(".md")) {
      const filePath = path.join(wilDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const slug = file.replace(".md", "");

      // week01 형식에서 숫자 추출
      const weekMatch = slug.match(/\d+/);
      const week = weekMatch ? parseInt(weekMatch[0], 10) : 0;

      wils.push({
        slug,
        week,
        title: `${week}주차 WIL`,
        excerpt: extractExcerpt(content),
      });
    }
  }

  // 주차 역순으로 정렬
  return wils.sort((a, b) => b.week - a.week);
}

export function getWilBySlug(slug: string): WilDetail | null {
  const wilDir = getWilDirPath();
  const filePath = path.join(wilDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    const weekMatch = slug.match(/\d+/);
    const week = weekMatch ? parseInt(weekMatch[0], 10) : 0;

    return {
      slug,
      week,
      title: data.title || `${week}주차 WIL`,
      excerpt: extractExcerpt(fileContent),
      content: fileContent,
    };
  }

  return null;
}
