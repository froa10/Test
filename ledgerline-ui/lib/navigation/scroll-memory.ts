const STORAGE_KEY = "llui-scroll-memory";

let suspendSavesUntil = 0;

export function scrollMemoryKey(pathname: string, search = "") {
  return search ? `${pathname}?${search}` : pathname;
}

/** Ignore scroll resets that fire while a page is leaving. */
export function pauseScrollSaves(ms = 400) {
  suspendSavesUntil = performance.now() + ms;
}

export function scrollSavesPaused() {
  return performance.now() < suspendSavesUntil;
}

function readAll(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveScrollPosition(key: string, y: number) {
  if (typeof window === "undefined" || scrollSavesPaused()) return;
  if (!Number.isFinite(y) || y < 0) return;

  const all = readAll();
  all[key] = Math.round(y);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function readScrollPosition(key: string): number | null {
  const y = readAll()[key];
  return typeof y === "number" && Number.isFinite(y) ? y : null;
}

export function getPageScroller(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.querySelector<HTMLElement>("[data-docs-scroll]");
}

export function readCurrentScroll() {
  const scroller = getPageScroller();
  return scroller ? scroller.scrollTop : window.scrollY;
}

export function writeCurrentScroll(y: number) {
  const scroller = getPageScroller();
  if (scroller) {
    scroller.scrollTop = y;
    return;
  }
  window.scrollTo({ top: y, left: 0, behavior: "instant" });
}

/** Snapshot the page the user is leaving, before the next view resets to the top. */
export function flushCurrentScroll(key: string) {
  const y = readCurrentScroll();
  const paused = scrollSavesPaused();
  suspendSavesUntil = 0;
  saveScrollPosition(key, y);
  if (paused) pauseScrollSaves();
}
