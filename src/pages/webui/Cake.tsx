import { MarkdownContent } from '../../components/MarkdownContent';
import cakeContent from '../../content/webui-cake.md?raw';

export function Cake() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <MarkdownContent content={cakeContent} />
      </div>
    </div>
  );
}
