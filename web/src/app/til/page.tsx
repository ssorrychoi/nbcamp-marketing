import Link from "next/link";
import { getAllTilMeta } from "@/lib/til";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "TIL - 포트폴리오",
  description: "매일의 학습 기록입니다.",
};

export default function TilPage() {
  const tils = getAllTilMeta();

  // 주차별로 그룹핑
  const tilsByWeek = tils.reduce(
    (acc, til) => {
      if (!acc[til.week]) {
        acc[til.week] = [];
      }
      acc[til.week].push(til);
      return acc;
    },
    {} as Record<number, typeof tils>
  );

  // 주차를 역순으로 정렬
  const sortedWeeks = Object.keys(tilsByWeek)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">TIL (Today I Learned)</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12">
        매일의 학습 내용을 기록합니다.
      </p>

      {sortedWeeks.map((week) => (
        <section key={week} className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            {week}주차
          </h2>

          <div className="space-y-3">
            {tilsByWeek[week].map((til) => (
              <Link
                key={til.slug}
                href={`/til/${til.slug}/`}
                className="block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {til.date}
                  </div>
                </div>
                {til.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {til.categories.map((cat) => (
                      <Badge key={cat}>{cat}</Badge>
                    ))}
                  </div>
                )}
                {til.excerpt && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {til.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
