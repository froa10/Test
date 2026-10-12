"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Command, Search } from "lucide-react";

import { useDocsSearchQuery } from "./use-docs-search-query";

function getSearchShortcutLabel() {
  if (typeof navigator === "undefined") return "Control K";

  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  const isApple =
    platform.includes("mac") ||
    platform.includes("iphone") ||
    platform.includes("ipad") ||
    userAgent.includes("mac os");

  return isApple ? "Command K" : "Control K";
}

function subscribeShortcutLabel() {
  return () => {};
}

export function DocsSearch() {
  const { inputRef, value, setValue, clearSearch, isFocusedRef } =
    useDocsSearchQuery();

  const shortcutLabel = useSyncExternalStore(
    subscribeShortcutLabel,
    getSearchShortcutLabel,
    () => "Control K",
  );
  const isApple = shortcutLabel === "Command K";

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Exactly one of Cmd or Ctrl, and nothing else held, so Ctrl+Shift+K and
      // Ctrl+Alt+K stay free for the browser and the OS.
      const searchChord =
        event.metaKey !== event.ctrlKey && !event.shiftKey && !event.altKey;

      if (searchChord && event.key.toLowerCase() === "k") {
        const isDesktop = globalThis.matchMedia("(min-width: 768px)").matches;
        if (!isDesktop) return;

        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        return;
      }

      if (
        event.key === "Escape" &&
        document.activeElement === inputRef.current
      ) {
        event.preventDefault();
        clearSearch();
        inputRef.current?.blur();
      }
    }

    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [clearSearch, inputRef]);

  return (
    <label className="relative block w-full md:max-w-sm">
      <span className="sr-only">Search components</span>
      <Search
        size={14}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-rose-500"
        aria-hidden
      />
      <input
        ref={inputRef}
        type="search"
        name="docs-component-search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => {
          isFocusedRef.current = true;
        }}
        onBlur={() => {
          isFocusedRef.current = false;
        }}
        placeholder="Search components…"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="search"
        data-1p-ignore
        data-lpignore="true"
        className="docs-search-input w-full rounded-lg border border-neutral-100 bg-neutral-50/50 py-1.5 pr-3 pl-8 font-sans text-base text-neutral-800 transition-colors outline-none placeholder:text-neutral-400 focus:border-neutral-300 focus:bg-white md:pr-16 md:text-sm"
      />
      <kbd
        aria-label={shortcutLabel}
        suppressHydrationWarning
        className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-neutral-100 bg-white px-1.5 py-0.5 font-mono text-[10px] text-neutral-400 md:inline-flex"
      >
        {isApple ? (
          <Command size={10} aria-hidden className="text-neutral-400" />
        ) : (
          <span aria-hidden>Ctrl</span>
        )}
        <span> + K</span>
      </kbd>
    </label>
  );
}
