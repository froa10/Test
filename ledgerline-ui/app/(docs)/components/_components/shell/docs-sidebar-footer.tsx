"use client";

import { useRef } from "react";
import { siteConfig } from "@/lib/site";

import { useForwardWheelToDocsMain } from "@/app/_shared/scroll/docs-scroll";

export function DocsSidebarFooter() {
  const footerRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useForwardWheelToDocsMain(footerRef);

  return (
    <div
      ref={footerRef}
      className="shrink-0 border-t border-neutral-100 px-5 py-4"
    >
      <p className="font-sans text-xs leading-relaxed text-neutral-500">
        {siteConfig.license.shortNote}{" "}
        <a
          href={siteConfig.license.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
        >
          {siteConfig.license.name}
        </a>
        .
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs text-neutral-400">
        <span>
          © {year} {siteConfig.displayName}
        </span>
      </div>
    </div>
  );
}
