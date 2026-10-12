import type { Metadata } from "next";

import {
  LegalPage,
  LegalSection,
} from "@/app/(marketing)/_components/legal-page";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Terms of Use | ${siteConfig.displayName}`,
  description: `Terms for using the ${siteConfig.displayName} site and components.`,
  path: "/terms",
});

export default function TermsPage() {
  const { displayName, license, upstream, github } = siteConfig;

  return (
    <LegalPage
      title="Terms of Use"
      updated="October 2026"
      otherPage={{ href: "/privacy", label: "Privacy" }}
    >
      <LegalSection heading="Using the components">
        <p>
          {`Component source code on ${displayName} is available under the ${license.name} license (${license.url}). You may use, copy, modify, and distribute it in personal and commercial projects, provided the copyright and permission notice is included with copies of the source.`}
        </p>
      </LegalSection>

      <LegalSection heading="Origin">
        <p>
          {`${displayName} is a fork of ${upstream.name} (${upstream.url}), released under the ${license.name} license. The original copyright notice is kept in this project's LICENSE file.`}
        </p>
      </LegalSection>

      <LegalSection heading="No warranty">
        <p>
          The site and components are provided &quot;as is&quot;, without
          warranty of any kind. You are responsible for testing components
          before using them in production.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>Questions about these terms: open an issue at {github.url}.</p>
      </LegalSection>
    </LegalPage>
  );
}
