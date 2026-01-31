import { MarkdownContent } from '../../components/MarkdownContent';
import workerStatusContent from '../../content/webui-worker-status.md?raw';

export function WorkerStatus() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <MarkdownContent content={workerStatusContent} />
      </div>
    </div>
  );
}
