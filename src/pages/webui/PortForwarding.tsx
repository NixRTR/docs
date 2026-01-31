import { MarkdownContent } from '../../components/MarkdownContent';
import portForwardingContent from '../../content/webui-port-forwarding.md?raw';

export function PortForwarding() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <MarkdownContent content={portForwardingContent} />
      </div>
    </div>
  );
}
