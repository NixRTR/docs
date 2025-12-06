import { MarkdownContent } from '../components/MarkdownContent';
import installationWebUINonNixOSRouterContent from '../content/installation-webui-non-nixos-router.md?raw';

export function InstallationWebUINonNixOSRouter() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <MarkdownContent content={installationWebUINonNixOSRouterContent} />
      </div>
    </div>
  );
}

