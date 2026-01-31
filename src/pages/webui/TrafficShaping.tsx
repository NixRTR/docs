import { MarkdownContent } from '../../components/MarkdownContent';
import trafficShapingContent from '../../content/webui-traffic-shaping.md?raw';

export function TrafficShaping() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <MarkdownContent content={trafficShapingContent} />
      </div>
    </div>
  );
}
