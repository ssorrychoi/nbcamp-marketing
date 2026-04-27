"use client";

interface PdfViewerProps {
  pdfPath: string;
  title: string;
}

export function PdfViewer({ pdfPath, title }: PdfViewerProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <a
          href={pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8l-4-2m4 2l4-2"
            />
          </svg>
          새 탭에서 열기
        </a>
        <a
          href={pdfPath}
          download={title}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          다운로드
        </a>
      </div>

      <iframe
        src={`${pdfPath}#toolbar=0&navpanes=0`}
        className="w-full h-96 border border-gray-300 dark:border-gray-700 rounded-lg"
        title={title}
      />
    </div>
  );
}
