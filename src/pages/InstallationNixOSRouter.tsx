import { MarkdownContent } from '../components/MarkdownContent';
import installationNixOSRouterContent from '../content/installation-nixos-router.md?raw';

export function InstallationNixOSRouter() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <MarkdownContent content={installationNixOSRouterContent} />
      </div>
    </div>
  );
}




