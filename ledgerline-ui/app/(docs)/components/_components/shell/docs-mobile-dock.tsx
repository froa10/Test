"use client";

import { Menu, Search } from "lucide-react";

import { cn } from "@/lib/cn";

import { useDocsShell } from "./docs-shell-context";

export function DocsMobileDock() {
  const shell = useDocsShell();
  const isSearchOpen = shell?.isSearchOpen ?? false;
  const isSidebarOpen = shell?.isSidebarOpen ?? false;

  return (
    <div
      className={cn(
        "ease-smooth pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-300 motion-reduce:transition-none md:hidden",
        isSearchOpen ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
      )}
      aria-hidden={isSearchOpen}
    >
      <div className="pointer-events-auto flex h-11 items-stretch overflow-hidden rounded-xl border border-neutral-200/60 bg-white/55 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <button
          type="button"
          onClick={shell?.openSearch}
          aria-label="Search components"
          className="inline-flex min-w-28 items-center gap-2 px-4 font-sans text-[15px] text-neutral-500 transition-colors active:bg-neutral-100/60 active:text-neutral-800"
        >
          <Search size={16} strokeWidth={1.75} aria-hidden />
          <span>Find</span>
        </button>

        <span
          aria-hidden
          className="my-auto h-4 w-px shrink-0 bg-neutral-300/70"
        />

        <button
          type="button"
          onClick={shell?.toggleSidebar}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
          className="inline-flex w-11 items-center justify-center text-neutral-600 transition-colors active:bg-neutral-100/60 active:text-neutral-900"
        >
          <Menu size={18} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
    </div>
  );
}
