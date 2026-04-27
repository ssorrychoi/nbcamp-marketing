import { markdownToHtml } from "@/lib/markdown";
import "highlight.js/styles/atom-one-dark.css";

interface MarkdownRendererProps {
  content: string;
}

export async function MarkdownRenderer({
  content,
}: MarkdownRendererProps) {
  const html = await markdownToHtml(content);

  return (
    <div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none">
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="
          [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
          [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2
          [&_p]:leading-7 [&_p]:text-gray-700 dark:[&_p]:text-gray-300
          [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-3
          [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-3
          [&_li]:my-1 [&_li]:text-gray-700 dark:[&_li]:text-gray-300
          [&_code]:bg-gray-100 dark:[&_code]:bg-gray-800 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-red-600 dark:[&_code]:text-red-400
          [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
          [&_pre_code]:text-sm
          [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 dark:[&_blockquote]:border-gray-700 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3
          [&_blockquote_p]:text-gray-600 dark:[&_blockquote_p]:text-gray-400
          [&_table]:w-full [&_table]:my-4 [&_table]:border-collapse
          [&_table_th]:border [&_table_th]:border-gray-300 dark:[&_table_th]:border-gray-700 [&_table_th]:px-3 [&_table_th]:py-2 [&_table_th]:font-bold [&_table_th]:bg-gray-100 dark:[&_table_th]:bg-gray-800 [&_table_th]:text-left
          [&_table_td]:border [&_table_td]:border-gray-300 dark:[&_table_td]:border-gray-700 [&_table_td]:px-3 [&_table_td]:py-2
          [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:hover:underline
          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4
          [&_input[type='checkbox']]:mr-2 [&_input[type='checkbox']]:align-middle
        "
      />
    </div>
  );
}
