import { MarkdownContent } from '../../components/MarkdownContent';
import blocklistsContent from '../../content/webui-blocklists.md?raw';

export function Blocklists() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <MarkdownContent content={blocklistsContent} />
      </div>
    </div>
  );
}
