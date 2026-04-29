import { getNoteBySlug, getAllNotesMeta, getFolderDisplayName } from "@/lib/notes";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";

export async function generateStaticParams() {
  try {
    const notes = getAllNotesMeta();
    const params = notes.map((note) => {
      const parts = note.slug.split("/");
      const encodedParts = parts.map(part => encodeURIComponent(part));
      return { path: encodedParts };
    });
    console.log(`[generateStaticParams] Generated ${params.length} params for notes`);
    return params;
  } catch (error) {
    console.error("[generateStaticParams] Error:", error);
    return [];
  }
}

interface Props {
  params: Promise<{
    path: string[];
  }>;
}

export default async function NoteDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const path = resolvedParams.path.map(decodeURIComponent);

  const folder = path[0];
  const slug = path.slice(1).join("/");

  const note = getNoteBySlug(folder, slug);

  if (!note) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">{note.title}</h1>
        <div className="flex gap-2">
          <Badge variant="outline">{getFolderDisplayName(note.folder)}</Badge>
        </div>
      </header>

      <div className="mb-16">
        <MarkdownRenderer content={note.content} />
      </div>
    </article>
  );
}
