import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface TilMeta {
  slug: string;
  date: string;
  week: number;
  title: string;
  categories: string[];
  excerpt?: string;
}

export interface TilDetail extends TilMeta {
  content: string;
}

function getTilDirPath(): string {
  // web 폴더 기준에서 ../TIL로 이동
  return path.join(process.cwd(), "..", "TIL");
}

function extractCategories(content: string): string[] {
  const categoryRegex = /\*\*카테고리\*\*:\s*((?:`#[^`]+`\s*)+)/;
  const match = content.match(categoryRegex);
  if (!match) return [];

  const categoryStr = match[1];
  const categoryMatches = categoryStr.match(/`#([^`]+)`/g) || [];
  return categoryMatches.map((cat) => cat.slice(2, -1));
}

function extractExcerpt(content: string, maxLength: number = 150): string {
  // 첫 번째 제목과 메타데이터 이후의 텍스트 추출
  const lines = content.split("\n");
  let foundMetadata = false;
  let excerptText = "";

  for (const line of lines) {
    if (line.startsWith("## ")) {
      excerptText = line.substring(3).trim();
      break;
    }
    if (foundMetadata && line.trim() && !line.startsWith("-")) {
      excerptText = line.trim();
      break;
    }
    if (line.startsWith("- **")) {
      foundMetadata = true;
    }
  }

  if (excerptText.length > maxLength) {
    return excerptText.substring(0, maxLength) + "...";
  }
  return excerptText;
}

export function getAllTilSlugs(): string[] {
  const tilDir = getTilDirPath();
  const slugs: string[] = [];

  if (!fs.existsSync(tilDir)) {
    return slugs;
  }

  const weeks = fs.readdirSync(tilDir);

  for (const week of weeks) {
    const weekPath = path.join(tilDir, week);
    const stat = fs.statSync(weekPath);

    if (!stat.isDirectory()) continue;

    const files = fs.readdirSync(weekPath);

    for (const file of files) {
      if (file.endsWith(".md")) {
        const slug = file.replace(".md", "");
        slugs.push(slug);
      }
    }
  }

  return slugs;
}

export function getAllTilMeta(): TilMeta[] {
  const tilDir = getTilDirPath();
  const tils: TilMeta[] = [];

  if (!fs.existsSync(tilDir)) {
    return tils;
  }

  const weeks = fs.readdirSync(tilDir);

  for (const week of weeks) {
    const weekPath = path.join(tilDir, week);
    const stat = fs.statSync(weekPath);

    if (!stat.isDirectory() || !week.startsWith("week")) continue;

    const weekNum = parseInt(week.replace("week", ""), 10);
    const files = fs.readdirSync(weekPath);

    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = path.join(weekPath, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const slug = file.replace(".md", "");

        tils.push({
          slug,
          date: slug, // 파일명이 YYYY-MM-DD 형식
          week: weekNum,
          title: `${slug} TIL`,
          categories: extractCategories(content),
          excerpt: extractExcerpt(content),
        });
      }
    }
  }

  // 날짜 역순으로 정렬
  return tils.sort((a, b) => b.date.localeCompare(a.date));
}

export function getTilBySlug(slug: string): TilDetail | null {
  const tilDir = getTilDirPath();
  const weeks = fs.readdirSync(tilDir);

  for (const week of weeks) {
    const weekPath = path.join(tilDir, week);
    const stat = fs.statSync(weekPath);

    if (!stat.isDirectory()) continue;

    const filePath = path.join(weekPath, `${slug}.md`);

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const weekNum = parseInt(week.replace("week", ""), 10);

      return {
        slug,
        date: slug,
        week: weekNum,
        title: data.title || `${slug} TIL`,
        categories: extractCategories(fileContent),
        excerpt: extractExcerpt(fileContent),
        content: fileContent, // 전체 원문 반환
      };
    }
  }

  return null;
}
