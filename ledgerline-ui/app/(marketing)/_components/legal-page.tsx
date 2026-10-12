import Link from "next/link";
import type { ReactNode } from "react";

import { FooterSkyline } from "@/app/(marketing)/_components/footer-skyline";
import { MarketingGoBack } from "@/app/(marketing)/_components/marketing-go-back";
import { MarketingSiteNav } from "@/app/(marketing)/_components/marketing-site-nav";

const linkClassName =
  "text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500";

type LegalPageProps = Readonly<{
  title: string;
  updated: string;
  otherPage: { href: string; label: string };
  children: ReactNode;
}>;

/** Shared layout for the privacy and terms pages. */
export function LegalPage({
  title,
  updated,
  otherPage,
  children,
}: LegalPageProps) {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      <div className="flex w-full min-w-0 flex-1 flex-col items-center px-3 pt-4 md:px-4">
        <article className="w-full max-w-xl">
          <MarketingSiteNav />

          <MarketingGoBack>
            <h1 className="font-serif text-3xl text-neutral-900">{title}</h1>
            <p className="mt-2 text-sm text-neutral-500">
              Last updated: {updated}
            </p>
          </MarketingGoBack>

          <p className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
            Template — review and complete this page before launching. It is not
            legal advice.
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
            {children}
          </div>

          <div className="mt-12 mb-16 flex flex-wrap gap-4 border-t border-neutral-100 pt-6">
            <Link href="/components" className={linkClassName}>
              Browse components
            </Link>
            <Link href={otherPage.href} className={linkClassName}>
              {otherPage.label}
            </Link>
          </div>
        </article>
      </div>

      <FooterSkyline className="mt-auto" />
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: Readonly<{ heading: string; children: ReactNode }>) {
  return (
    <section>
      <h2 className="font-semibold text-neutral-900">{heading}</h2>
      <div className="mt-2 space-y-2">{children}</div>
    </section>
  );
}
