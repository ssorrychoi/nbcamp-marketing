interface BadgeProps {
  children: string;
  variant?: string;
}

const categoryColors: Record<string, string> = {
  "1주차마무리": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "팀프로젝트": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  마케팅: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  데이터: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  분석: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  AI: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  콘텐츠: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function Badge({ children, variant }: BadgeProps) {
  const colorClass =
    categoryColors[children] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      {children}
    </span>
  );
}
