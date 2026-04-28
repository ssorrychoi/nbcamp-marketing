import { getNoteBySlug, getAllNotesMeta } from "@/lib/notes";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";

export async function generateStaticParams() {
  const notes = getAllNotesMeta();
  return notes.map((note) => {
    return {
      folder: encodeURIComponent(note.folder),
      slug: encodeURIComponent(note.title),
    };
  });
}

interface Props {
  params: Promise<{
    folder: string;
    slug: string;
  }>;
}

export default async function NoteDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const folder = decodeURIComponent(resolvedParams.folder);
  const slug = decodeURIComponent(resolvedParams.slug);
  const note = getNoteBySlug(folder, slug);

  if (!note) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">{note.title}</h1>
        <div className="flex gap-2">
          <Badge variant="outline">{note.folder}</Badge>
        </div>
      </header>
      
      <div className="mb-16">
        <MarkdownRenderer content={note.content} />
      </div>
    </article>
  );
}
