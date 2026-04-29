import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const FOLDER_DISPLAY_NAMES: Record<string, string> = {
  "ai-ad-planning-using-llm": "AI를 활용한 광고 기획법",
};

export function getFolderDisplayName(folder: string): string {
  return FOLDER_DISPLAY_NAMES[folder] ?? folder;
}

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

function collectNotesRecursively(
  dirPath: string,
  topFolder: string,
  relativePath: string = ""
): NoteMeta[] {
  const notes: NoteMeta[] = [];

  if (!fs.existsSync(dirPath)) {
    return notes;
  }

  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const subPath = relativePath ? `${relativePath}/${item}` : item;
      notes.push(...collectNotesRecursively(itemPath, topFolder, subPath));
    } else if (item.endsWith(".md")) {
      const filename = item.replace(".md", "");
      const slug = relativePath ? `${relativePath}/${filename}` : filename;
      const content = fs.readFileSync(itemPath, "utf-8");
      const { data } = matter(content);

      notes.push({
        slug: `${topFolder}/${slug}`,
        folder: topFolder,
        title: data.title || slug,
        excerpt: extractExcerpt(content),
      });
    }
  }

  return notes;
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

    notes.push(...collectNotesRecursively(folderPath, folder));
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
