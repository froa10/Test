import type { Metadata } from "next";

import {
  LegalPage,
  LegalSection,
} from "@/app/(marketing)/_components/legal-page";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Privacy Policy | ${siteConfig.displayName}`,
  description: `How ${siteConfig.displayName} handles visitor data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const { displayName, url, github } = siteConfig;

  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2026"
      otherPage={{ href: "/terms", label: "Terms" }}
    >
      <LegalSection heading="Overview">
        <p>
          {displayName} ({url}) is a free, static component library site. It has
          no accounts, no sign-up, and no analytics or advertising trackers.
        </p>
      </LegalSection>

      <LegalSection heading="What is stored in your browser">
        <p>
          The site keeps a few navigation helpers in your browser&apos;s session
          storage (your in-site back history and scroll positions) so the back
          button and scroll restoration work. They never leave your device and
          are cleared when you close the tab.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party requests">
        <p>
          The GitHub star count in the header is loaded from the public GitHub
          API ({github.url}). GitHub receives your IP address and browser
          details for that request under its own privacy policy. Your hosting
          provider may also keep standard server logs.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>Questions about this policy: open an issue at {github.url}.</p>
      </LegalSection>
    </LegalPage>
  );
}
