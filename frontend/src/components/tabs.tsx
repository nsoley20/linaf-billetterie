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
      <div role="tablist" className="mb-6 flex gap-6 border-b border-line">
        {tabs.map((t) => (
          <Link
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            href={`${pathname}?${param}=${t.id}`}
            scroll={false}
            replace
            className="-mb-px border-b-[3px] border-transparent pb-2 font-display text-2xl font-bold text-faint hover:text-fg aria-selected:border-pelouse aria-selected:text-fg"
          >
            {t.label}
          </Link>
        ))}
      </div>
      <div role="tabpanel">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
