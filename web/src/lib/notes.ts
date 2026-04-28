import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface NoteMeta {
  slug: string;
  folder: string;
  title: string;
  excerpt?: string;
}

export interface NoteDetail extends NoteMeta {
  content: string;
}

function getNotesDirPath(): string {
  return path.join(process.cwd(), "..", "TIL", "강의노트");
}

function extractExcerpt(content: string, maxLength: number = 150): string {
  const lines = content.split("\n");
  let excerptText = "";

  for (const line of lines) {
    if (line.startsWith("## ")) {
      excerptText = line.substring(3).trim();
      break;
    }
    if (line.startsWith("> ")) {
      excerptText = line.substring(2).trim();
      break;
    }
  }

  if (!excerptText) {
      const p = lines.find(l => l.trim().length > 10 && !l.startsWith("#"));
      if (p) excerptText = p.trim();
  }

  if (excerptText.length > maxLength) {
    return excerptText.substring(0, maxLength) + "...";
  }
  return excerptText;
}

export function getAllNotesMeta(): NoteMeta[] {
  const notesDir = getNotesDirPath();
  const notes: NoteMeta[] = [];

  if (!fs.existsSync(notesDir)) {
    return notes;
  }

  const folders = fs.readdirSync(notesDir);

  for (const folder of folders) {
    const folderPath = path.join(notesDir, folder);
    const stat = fs.statSync(folderPath);

    if (!stat.isDirectory()) continue;

    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      if (file.endsWith(".md")) {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const slug = file.replace(".md", "");

        notes.push({
          slug: `${folder}/${slug}`,
          folder,
          title: slug,
          excerpt: extractExcerpt(content),
        });
      }
    }
  }

  return notes;
}

export function getNoteBySlug(folder: string, slug: string): NoteDetail | null {
  const notesDir = getNotesDirPath();
  const filePath = path.join(notesDir, folder, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug: `${folder}/${slug}`,
      folder,
      title: data.title || slug,
      excerpt: extractExcerpt(fileContent),
      content: fileContent,
    };
  }

  return null;
}
