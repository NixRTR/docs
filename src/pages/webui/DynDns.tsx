import { MarkdownContent } from '../../components/MarkdownContent';
import dyndnsContent from '../../content/webui-dyndns.md?raw';

export function DynDns() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <MarkdownContent content={dyndnsContent} />
      </div>
    </div>
  );
}
