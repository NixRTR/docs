import { MarkdownContent } from '../../components/MarkdownContent';
import logsContent from '../../content/webui-logs.md?raw';

export function Logs() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <MarkdownContent content={logsContent} />
      </div>
    </div>
  );
}
