import Link from "next/link";
import { getAllTilMeta } from "@/lib/til";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const recentTils = getAllTilMeta().slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 프로필 섹션 */}
      <section className="mb-16">
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold">최대용</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            KDT 생성형 AI 기반 디지털 마케팅 전문가 양성 과정 수강생
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          {/* 소개 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              소개
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              마케팅에 관심이 있는 개발자입니다. 데이터 기반의 마케팅 전략과 콘텐츠
              제작에 집중하고 있습니다.
            </p>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
              연락처
            </h3>
            <div className="space-y-2">
              <a
                href="mailto:zzaesung17@gmail.com"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>📧</span> zzaesung17@gmail.com
              </a>
              <a
                href="https://github.com/ssorrychoi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>🐙</span> GitHub
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>📸</span> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* 경력 */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
            경력
          </h3>
          <div className="space-y-4">
            <div className="border-l-2 border-blue-600 pl-4">
              <div className="font-semibold">KDT 생성형 AI 기반 디지털 마케팅 과정</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">2026.04 - 2026.09</div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                마케팅 기초 이론부터 데이터 분석, AI 활용까지 종합적으로 학습
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 최근 TIL */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">최근 TIL</h2>
          <Link
            href="/til/"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            모두 보기 →
          </Link>
        </div>

        <div className="space-y-4">
          {recentTils.map((til) => (
            <Link
              key={til.slug}
              href={`/til/${til.slug}/`}
              className="block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {til.date}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {til.week}주차
                </span>
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

      {/* 프로젝트 링크 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">프로젝트</h2>
        <Link
          href="/projects/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
        >
          프로젝트 보기 →
        </Link>
      </section>
    </div>
  );
}
