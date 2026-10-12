"use client";

import Link from "next/link";
import { Suspense } from "react";

import { siteConfig } from "@/lib/site";

import { DocsGithubLink } from "./docs-github-link";
import { DocsSearch } from "./docs-search";
import { LogoIcon } from "@/app/(marketing)/_components/Logo";

export function DocsHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b-0 bg-white/55 backdrop-blur-xl md:static md:shrink-0 md:border-b md:border-neutral-200 md:bg-white md:backdrop-blur-none">
      <div className="flex h-14 items-center gap-3 px-3 md:gap-4 md:px-6">
        <Link href="/" className="inline-flex min-w-0 shrink-0 items-center">
          <div className="flex items-center gap-1">
            <LogoIcon className="w-5 md:w-6" />
            <span className="truncate font-sans text-base font-medium tracking-tighter md:text-lg">
              {siteConfig.displayName}
            </span>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 md:flex md:justify-center">
          <div className="w-full md:max-w-sm">
            <Suspense fallback={null}>
              <DocsSearch />
            </Suspense>
          </div>
        </div>

        <div className="ml-auto shrink-0">
          <DocsGithubLink className="border-neutral-200/50 bg-white/40 backdrop-blur-2xl hover:border-neutral-200/60 hover:bg-white/55 md:border-neutral-100 md:bg-white md:backdrop-blur-none md:hover:border-neutral-100 md:hover:bg-neutral-50" />
        </div>
      </div>
    </header>
  );
}
