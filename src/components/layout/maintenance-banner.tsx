import { siteConfig } from "@/content/site";

export function MaintenanceBanner() {
  const { enabled, message } = siteConfig.maintenance;
  if (!enabled) {
    return null;
  }

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center justify-center bg-[#111] px-4 text-center text-xs font-medium tracking-wide text-white sm:text-sm"
    >
      <p className="truncate">{message}</p>
    </div>
  );
}
