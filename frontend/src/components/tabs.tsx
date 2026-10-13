"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Tab = { id: string; label: string; content: React.ReactNode };

/** Onglets pilotés par l'URL (?param=id) pour pouvoir partager un lien vers un onglet. */
export function Tabs(props: { param: string; tabs: Tab[]; defaultId: string }) {
  return (
    <Suspense fallback={<TabsView {...props} active={props.defaultId} />}>
      <TabsWithParams {...props} />
    </Suspense>
  );
}

function TabsWithParams(props: { param: string; tabs: Tab[]; defaultId: string }) {
  const params = useSearchParams();
  const requested = params.get(props.param);
  const active = props.tabs.some((t) => t.id === requested) ? requested! : props.defaultId;
  return <TabsView {...props} active={active} />;
}

function TabsView({ param, tabs, active }: { param: string; tabs: Tab[]; active: string }) {
  const pathname = usePathname();
  return (
    <div>
      <div role="tablist" className="mb-6 inline-flex rounded-xl border border-line bg-surface p-1">
        {tabs.map((t) => (
          <Link
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            href={`${pathname}?${param}=${t.id}`}
            scroll={false}
            replace
            className="rounded-lg px-4 py-2 text-sm font-semibold text-muted transition hover:text-fg aria-selected:bg-green aria-selected:text-white"
          >
            {t.label}
          </Link>
        ))}
      </div>
      <div role="tabpanel">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
