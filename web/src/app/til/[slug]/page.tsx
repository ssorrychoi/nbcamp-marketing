import Link from "next/link";
import { getAllTilSlugs, getTilBySlug, getAllTilMeta } from "@/lib/til";
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllTilSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const til = getTilBySlug(slug);
  if (!til) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${til.date} TIL - 포트폴리오`,
    description: til.excerpt || "Today I Learned",
  };
}

export default async function TilDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const til = getTilBySlug(slug);

  if (!til) {
    notFound();
  }

  // 이전/다음 TIL 찾기
  const allTils = getAllTilMeta();
  const currentIndex = allTils.findIndex((t) => t.slug === til.slug);
  const prevTil = currentIndex > 0 ? allTils[currentIndex - 1] : null;
  const nextTil = currentIndex < allTils.length - 1 ? allTils[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 네비게이션 */}
      <Link
        href="/til/"
        className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        ← TIL 목록으로 돌아가기
      </Link>

      {/* 헤더 */}
      <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl font-bold mb-4">{til.date}</h1>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {til.week}주차
          </span>
        </div>
        {til.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {til.categories.map((cat) => (
              <Badge key={cat}>{cat}</Badge>
            ))}
          </div>
        )}
      </header>

      {/* 콘텐츠 */}
      <article className="mb-16">
        <MarkdownRenderer content={til.content} />
      </article>

      {/* 네비게이션 */}
      <div className="flex gap-4 justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
        {prevTil ? (
          <Link
            href={`/til/${prevTil.slug}/`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← {prevTil.date}
          </Link>
        ) : (
          <div />
        )}
        {nextTil ? (
          <Link
            href={`/til/${nextTil.slug}/`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {nextTil.date} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
