"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";

import type { ShowcaseNavCategoryGroup } from "@/lib/showcase";
import { useLockDocsPageScroll } from "@/app/_shared/scroll/docs-scroll";

import { DocsHeader } from "./docs-header";
import { DocsMobileDock } from "./docs-mobile-dock";
import { DocsSearchDialog } from "./docs-search-dialog";
import { DocsShellProvider } from "./docs-shell-context";
import { DocsSidebar } from "./docs-sidebar";

type DocsShellClientProps = Readonly<{
  categories: ShowcaseNavCategoryGroup[];
  children: ReactNode;
}>;

function DocsSidebarFallback() {
  return (
    <aside className="hidden w-80 shrink-0 border-r border-neutral-100 bg-white md:flex" />
  );
}

export function DocsShellClient({
  categories,
  children,
}: DocsShellClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useLockDocsPageScroll();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
          return;
        }
        if (isSidebarOpen) {
          setIsSidebarOpen(false);
        }
        return;
      }

      const searchChord =
        event.metaKey !== event.ctrlKey && !event.shiftKey && !event.altKey;

      if (searchChord && event.key.toLowerCase() === "k") {
        const isDesktop = globalThis.matchMedia("(min-width: 768px)").matches;
        if (!isDesktop) {
          event.preventDefault();
          setIsSearchOpen(true);
          setIsSidebarOpen(false);
        }
      }
    }

    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [isSearchOpen, isSidebarOpen]);

  const shellValue = {
    isSidebarOpen,
    toggleSidebar: () => {
      setIsSidebarOpen((open) => !open);
      setIsSearchOpen(false);
    },
    closeSidebar: () => setIsSidebarOpen(false),
    isSearchOpen,
    openSearch: () => {
      setIsSearchOpen(true);
      setIsSidebarOpen(false);
    },
    closeSearch: () => setIsSearchOpen(false),
  };

  return (
    <DocsShellProvider value={shellValue}>
      <div className="relative flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-white selection:bg-neutral-800 selection:text-white">
        <DocsHeader />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <Suspense fallback={<DocsSidebarFallback />}>
            <DocsSidebar categories={categories} />
          </Suspense>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>
        <DocsMobileDock />
        <Suspense fallback={null}>
          <DocsSearchDialog categories={categories} />
        </Suspense>
      </div>
    </DocsShellProvider>
  );
}
