import Link from "next/link";
import { getAllWilMeta } from "@/lib/wil";

export const metadata = {
  title: "WIL - 포트폴리오",
  description: "매주의 회고 기록입니다.",
};

export default function WilPage() {
  const wils = getAllWilMeta();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">WIL (Weekly I Learned)</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12">
        매주의 회고와 배운 점을 정리합니다.
      </p>

      <div className="space-y-4">
        {wils.map((wil) => (
          <Link
            key={wil.slug}
            href={`/wil/${wil.slug}/`}
            className="block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="font-semibold text-gray-900 dark:text-white">
                {wil.title}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {wil.slug}
              </span>
            </div>
            {wil.excerpt && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {wil.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
