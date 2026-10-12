"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Search, X } from "lucide-react";

import { cn } from "@/lib/cn";
import { getCategoryPath } from "@/lib/showcase/category-slug";
import type { ShowcaseNavCategoryGroup } from "@/lib/showcase";

import { useDocsShell } from "./docs-shell-context";
import { useDocsSearchQuery } from "./use-docs-search-query";

const TOP_SEARCHES = [
  {
    label: "Annotated text",
    detail: "Underlines",
    query: "annotated",
  },
  {
    label: "Mockups",
    detail: "Category",
    query: "mockup",
    href: getCategoryPath("Mockups"),
  },
  {
    label: "Background",
    detail: "Patterns & gradients",
    query: "background",
  },
  {
    label: "Widgets",
    detail: "Category",
    query: "widget",
    href: getCategoryPath("Widgets"),
  },
  {
    label: "Forms",
    detail: "Category",
    query: "form",
    href: getCategoryPath("Forms"),
  },
] as const;

const LETTER_COLORS = [
  "text-sky-600",
  "text-rose-500",
  "text-amber-600",
  "text-emerald-600",
  "text-cyan-600",
] as const;

type DocsSearchDialogProps = Readonly<{
  categories: ShowcaseNavCategoryGroup[];
}>;

function searchNavEntries(
  categories: ShowcaseNavCategoryGroup[],
  query: string,
) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return categories
    .flatMap((group) =>
      group.items.map((item) => ({
        ...item,
        category: group.category,
      })),
    )
    .filter((item) => {
      const haystack = [
        item.title,
        item.category,
        item.slug,
        item.description,
        item.file,
        item.exportName,
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    })
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 40);
}

function LetterMark({
  label,
  index,
}: Readonly<{ label: string; index: number }>) {
  return (
    <div className="flex size-5 shrink-0 items-center justify-center rounded bg-white/80">
      <span
        className={cn(
          "font-sans text-[10px] font-semibold",
          LETTER_COLORS[index % LETTER_COLORS.length],
        )}
      >
        {label.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

export function DocsSearchDialog({ categories }: DocsSearchDialogProps) {
  const router = useRouter();
  const shell = useDocsShell();
  const isOpen = shell?.isSearchOpen ?? false;
  const closeSearch = shell?.closeSearch;
  const wasOpenRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { inputRef, value, setValue, applySearch, isFocusedRef } =
    useDocsSearchQuery({ syncUrl: false });

  const trimmed = value.trim();
  const results = useMemo(
    () => searchNavEntries(categories, trimmed),
    [categories, trimmed],
  );
  const showSuggestions = trimmed.length === 0;

  useEffect(() => {
    if (!isOpen) {
      wasOpenRef.current = false;
      return;
    }

    if (wasOpenRef.current) return;
    wasOpenRef.current = true;

    const frame = globalThis.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => globalThis.cancelAnimationFrame(frame);
  }, [isOpen, inputRef]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [trimmed, showSuggestions]);

  function finishWithQuery(next: string) {
    setValue(next);
    applySearch(next);
    closeSearch?.();
  }

  function goTo(href: string) {
    closeSearch?.();
    router.push(href);
  }

  function clearValue() {
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-60 flex items-center justify-center p-4 md:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close search"
        onClick={closeSearch}
        className={cn(
          "ease-smooth absolute inset-0 bg-neutral-900/20 transition-opacity duration-300 motion-reduce:transition-none",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search components"
        className={cn(
          "ease-smooth relative z-10 flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/75 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-[opacity,transform] duration-300 motion-reduce:transition-none",
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-[0.97] opacity-0",
        )}
      >
        <div className="shrink-0 border-b border-neutral-200/40 p-3">
          <label className="relative block">
            <span className="sr-only">Search components</span>
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400"
              aria-hidden
            />
            <input
              ref={inputRef}
              type="text"
              name="docs-component-search"
              value={value}
              tabIndex={isOpen ? 0 : -1}
              onChange={(event) => setValue(event.target.value)}
              onFocus={() => {
                isFocusedRef.current = true;
              }}
              onBlur={() => {
                isFocusedRef.current = false;
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  finishWithQuery(value);
                }
              }}
              placeholder="Search components…"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="search"
              data-1p-ignore
              data-lpignore="true"
              className="docs-search-input w-full rounded-xl border border-white/70 bg-white/60 py-2.5 pr-10 pl-10 font-sans text-base leading-normal text-neutral-700 transition-colors outline-none placeholder:text-neutral-400 focus:border-white/90 focus:bg-white/75"
            />
            {value ? (
              <button
                type="button"
                tabIndex={isOpen ? 0 : -1}
                onMouseDown={(event) => event.preventDefault()}
                onClick={clearValue}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-white/60 hover:text-neutral-600"
              >
                <X size={16} aria-hidden />
              </button>
            ) : null}
          </label>
        </div>

        <div className="flex flex-col">
          <p className="shrink-0 px-4 pt-2.5 pb-1 font-mono text-[10px] tracking-[0.14em] text-neutral-400 uppercase">
            {showSuggestions
              ? "Top searches"
              : results.length > 0
                ? `${results.length} result${results.length === 1 ? "" : "s"}`
                : "No matches"}
          </p>

          <div
            ref={listRef}
            className="h-50 overflow-y-auto overscroll-contain"
          >
            {showSuggestions ? (
              <ul className="flex flex-col">
                {TOP_SEARCHES.map((item, index) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      tabIndex={isOpen ? 0 : -1}
                      onClick={() => {
                        if ("href" in item && item.href) {
                          goTo(item.href);
                          return;
                        }
                        setValue(item.query);
                      }}
                      className="group flex h-10 w-full items-center gap-2.5 px-4 text-left transition-colors active:bg-white/50"
                    >
                      <LetterMark label={item.label} index={index} />
                      <span className="min-w-0 flex-1 truncate font-sans text-sm text-neutral-700">
                        {item.label}
                        <span className="font-normal text-neutral-400">
                          {" "}
                          / {item.detail}
                        </span>
                      </span>
                      <ChevronRight
                        size={14}
                        className="shrink-0 text-neutral-300"
                        aria-hidden
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : results.length > 0 ? (
              <ul className="flex flex-col">
                {results.map((item, index) => (
                  <li key={item.slug}>
                    <Link
                      href={`/components/${item.slug}`}
                      tabIndex={isOpen ? 0 : -1}
                      onClick={() => closeSearch?.()}
                      className="group flex h-10 items-center gap-2.5 px-4 transition-colors active:bg-white/50"
                    >
                      <LetterMark label={item.title} index={index} />
                      <span className="min-w-0 flex-1 truncate font-sans text-sm text-neutral-700">
                        {item.title}
                        <span className="font-normal text-neutral-400">
                          {" "}
                          / {item.category}
                        </span>
                      </span>
                      <ChevronRight
                        size={14}
                        className="shrink-0 text-neutral-300"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-4 font-sans text-sm text-neutral-500">
                Nothing matches “{trimmed}”. Try mockups or annotated.
              </p>
            )}
          </div>

          <div className="flex h-11 shrink-0 items-center border-t border-neutral-200/40 px-4">
            {!showSuggestions ? (
              <button
                type="button"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => finishWithQuery(value)}
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-neutral-700 transition-colors active:text-neutral-500"
              >
                <Search size={14} aria-hidden />
                Search all for “{trimmed}”
              </button>
            ) : (
              <p className="font-sans text-xs text-neutral-400">
                Type to filter components
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
