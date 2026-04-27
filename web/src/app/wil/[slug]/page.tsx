import Link from "next/link";
import { getAllWilSlugs, getWilBySlug, getAllWilMeta } from "@/lib/wil";
import { MarkdownRenderer } from "@/components/markdown/markdown-renderer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllWilSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const wil = getWilBySlug(params.slug);
  if (!wil) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${wil.title} - 포트폴리오`,
    description: wil.excerpt || "Weekly I Learned",
  };
}

export default function WilDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const wil = getWilBySlug(params.slug);

  if (!wil) {
    notFound();
  }

  // 이전/다음 WIL 찾기
  const allWils = getAllWilMeta();
  const currentIndex = allWils.findIndex((w) => w.slug === wil.slug);
  const prevWil = currentIndex > 0 ? allWils[currentIndex - 1] : null;
  const nextWil = currentIndex < allWils.length - 1 ? allWils[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 네비게이션 */}
      <Link
        href="/wil/"
        className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        ← WIL 목록으로 돌아가기
      </Link>

      {/* 헤더 */}
      <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl font-bold mb-4">{wil.title}</h1>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {wil.slug}
          </span>
        </div>
      </header>

      {/* 콘텐츠 */}
      <article className="mb-16">
        <MarkdownRenderer content={wil.content} />
      </article>

      {/* 네비게이션 */}
      <div className="flex gap-4 justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
        {prevWil ? (
          <Link
            href={`/wil/${prevWil.slug}/`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← {prevWil.title}
          </Link>
        ) : (
          <div />
        )}
        {nextWil ? (
          <Link
            href={`/wil/${nextWil.slug}/`}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {nextWil.title} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
