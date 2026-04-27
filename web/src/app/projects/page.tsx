import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { PdfViewer } from "@/components/projects/pdf-viewer";

export const metadata = {
  title: "프로젝트 - 포트폴리오",
  description: "프로젝트 포트폴리오입니다.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">프로젝트</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-12">
        과정 중 진행한 프로젝트들입니다.
      </p>

      <div className="space-y-12">
        {projects.map((project) => (
          <section
            key={project.id}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6"
          >
            {/* 프로젝트 헤더 */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {project.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {project.module} • {project.period}
              </p>
            </div>

            {/* 상태 배지 */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === "completed"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : project.status === "in-progress"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {project.status === "completed"
                  ? "완료"
                  : project.status === "in-progress"
                    ? "진행중"
                    : "계획중"}
              </span>
            </div>

            {/* 설명 */}
            {project.description && (
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {project.description}
              </p>
            )}

            {/* PDF 뷰어 */}
            {project.pdfPath && (
              <div className="mt-6">
                <PdfViewer
                  pdfPath={project.pdfPath}
                  title={project.title}
                />
              </div>
            )}

            {/* 파일 없음 메시지 */}
            {!project.pdfPath && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-600 dark:text-gray-400">
                산출물이 준비 중입니다.
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
