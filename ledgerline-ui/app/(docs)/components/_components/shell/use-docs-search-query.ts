"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  getHydratedSearchParam,
  useHydratedSearchParams,
} from "@/app/_shared/navigation/use-hydrated-search-params";

function getComponentsSearchPath(pathname: string) {
  return pathname.startsWith("/components") ? "/components" : pathname;
}

export function useDocsSearchQuery(
  options: Readonly<{ syncUrl?: boolean }> = {},
) {
  const syncUrl = options.syncUrl ?? true;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useHydratedSearchParams();
  const urlQuery = getHydratedSearchParam(searchParams, "q") ?? "";

  const inputRef = useRef<HTMLInputElement>(null);
  const isFocusedRef = useRef(false);
  const committedRef = useRef(urlQuery);
  const [value, setValue] = useState("");
  const [, startTransition] = useTransition();

  const applySearch = useCallback(
    (next: string) => {
      const trimmed = next.trim();
      if (trimmed === committedRef.current.trim()) return;

      committedRef.current = trimmed;

      const params = new URLSearchParams(searchParams?.toString() ?? "");

      if (trimmed) {
        params.set("q", trimmed);
        params.delete("category");
      } else {
        params.delete("q");
      }

      const nextQuery = params.toString();
      const base = getComponentsSearchPath(pathname);
      const href = nextQuery ? `${base}?${nextQuery}` : base;

      startTransition(() => {
        router.replace(href, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  // Sync URL → input for back/forward and external links, never while the field is focused.
  useEffect(() => {
    committedRef.current = urlQuery;
    if (!isFocusedRef.current) {
      setValue(urlQuery);
    }
  }, [urlQuery]);

  // Debounce typing before updating the URL so keystrokes stay local and fast.
  useEffect(() => {
    if (!syncUrl) return;

    const timer = globalThis.setTimeout(() => {
      applySearch(value);
    }, 300);

    return () => globalThis.clearTimeout(timer);
  }, [value, applySearch, syncUrl]);

  const clearSearch = useCallback(() => {
    setValue("");
    applySearch("");
  }, [applySearch]);

  return {
    inputRef,
    value,
    setValue,
    applySearch,
    clearSearch,
    isFocusedRef,
  };
}
