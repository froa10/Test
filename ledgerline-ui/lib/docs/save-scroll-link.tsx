"use client";

import Link from "next/link";
import { forwardRef, type ComponentProps } from "react";

import {
  flushCurrentScroll,
  pauseScrollSaves,
  scrollMemoryKey,
} from "@/lib/navigation/scroll-memory";
import { saveShowcaseScroll } from "@/lib/showcase/scroll-restoration";

type SaveScrollLinkProps = ComponentProps<typeof Link>;

export const SaveScrollLink = forwardRef<
  HTMLAnchorElement,
  SaveScrollLinkProps
>(function SaveScrollLink({ href, onClick, ...props }, ref) {
  return (
    <Link
      {...props}
      ref={ref}
      href={href}
      onClick={(event) => {
        const path =
          typeof globalThis !== "undefined" ? globalThis.location.pathname : "";
        const search =
          typeof globalThis !== "undefined" ? globalThis.location.search : "";
        flushCurrentScroll(scrollMemoryKey(path, search.replace(/^\?/, "")));
        pauseScrollSaves();
        saveShowcaseScroll();

        onClick?.(event);
      }}
    />
  );
});
