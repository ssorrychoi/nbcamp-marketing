import Link from "next/link";
import { getAllNotesMeta, getFolderDisplayName } from "@/lib/notes";

export const metadata = {
  title: "강의노트 - 포트폴리오",
  description: "강의노트 기록입니다.",
};

export default function NotesPage() {
  const notes = getAllNotesMeta();

  // 폴더별로 그룹핑
  const notesByFolder = notes.reduce(
    (acc, note) => {
      if (!acc[note.folder]) {
        acc[note.folder] = [];
      }
      acc[note.folder].push(note);
      return acc;
    },
    {} as Record<string, typeof notes>
  );

  const folders = Object.keys(notesByFolder).sort();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">강의노트</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12">
        강의를 들으며 정리한 내용입니다.
      </p>

      {folders.map((folder) => (
        <section key={folder} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            {getFolderDisplayName(folder)}
          </h2>

          <div className="space-y-3">
            {notesByFolder[folder].map((note) => {
              const [, noteSlug] = note.slug.split("/");
              return (
                <Link
                  key={note.slug}
                  href={`/notes/${encodeURIComponent(note.folder)}/${encodeURIComponent(noteSlug)}/`}
                  className="block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    {note.title}
                  </div>
                {note.excerpt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {note.excerpt}
                  </p>
                )}
              </Link>
            );
          })}
          </div>
        </section>
      ))}
    </div>
  );
}
