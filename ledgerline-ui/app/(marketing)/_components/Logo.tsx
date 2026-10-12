import type { SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Ledgerline UI</title>
      {/* ledger page with three ruled lines and a margin rule */}
      <rect x="3" y="2.5" width="18" height="19" rx="4.5" fill="#0F766E" />
      <path
        d="M8 2.5v19"
        stroke="#5EEAD4"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M10.5 8h6.5M10.5 12h6.5M10.5 16h4"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
