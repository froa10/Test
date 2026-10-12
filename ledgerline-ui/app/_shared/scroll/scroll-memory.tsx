"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  getPageScroller,
  pauseScrollSaves,
  readCurrentScroll,
  readScrollPosition,
  saveScrollPosition,
  scrollMemoryKey,
  scrollSavesPaused,
  writeCurrentScroll,
} from "@/lib/navigation/scroll-memory";

/**
 * Remembers each page's scroll (window, or the docs panel) and restores it
 * when the user comes back from Next / Previous or the browser back button.
 */
export function ScrollMemory() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const key = scrollMemoryKey(pathname, searchParams.toString());

  useEffect(() => {
    const onPopState = () => pauseScrollSaves();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const saved = readScrollPosition(key);
    let frames = 0;
    let raf = 0;

    const restore = () => {
      const y = saved ?? 0;
      if (y > 0) writeCurrentScroll(y);
      frames += 1;
      if (frames < 6) raf = requestAnimationFrame(restore);
    };

    pauseScrollSaves(500);
    raf = requestAnimationFrame(restore);

    let ticking = false;
    const onScroll = () => {
      if (scrollSavesPaused() || frames < 6) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (scrollSavesPaused()) return;
        saveScrollPosition(key, readCurrentScroll());
      });
    };

    const scroller = getPageScroller();
    const target: HTMLElement | Window = scroller ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("scroll", onScroll);
    };
  }, [key]);

  return null;
}
