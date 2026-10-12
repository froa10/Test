/**
 * Renders Ledgerline UI brand images into public/ from inline SVG:
 * logo.png (512²), og-image.png (1200×630), icon-192.png, icon-512.png.
 * app/favicon.ico is written as a PNG-in-ICO (32×32).
 *
 * Run: node scripts/brand/generate-brand-assets.mjs
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const TEAL = "#0F766E";
const MINT = "#5EEAD4";

const mark = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <rect x="3" y="2.5" width="18" height="19" rx="4.5" fill="${TEAL}"/>
  <path d="M8 2.5v19" stroke="${MINT}" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M10.5 8h6.5M10.5 12h6.5M10.5 16h4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

const ogImage = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <g stroke="#f1f5f9" stroke-width="2">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="0" y1="${60 + i * 48}" x2="1200" y2="${60 + i * 48}"/>`).join("")}
  </g>
  <line x1="150" y1="0" x2="150" y2="630" stroke="${MINT}" stroke-width="3"/>
  <g transform="translate(220 175) scale(9)">
    <rect x="3" y="2.5" width="18" height="19" rx="4.5" fill="${TEAL}"/>
    <path d="M8 2.5v19" stroke="${MINT}" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M10.5 8h6.5M10.5 12h6.5M10.5 16h4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
  </g>
  <text x="470" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="84" fill="#171717">Ledgerline UI</text>
  <text x="474" y="370" font-family="Helvetica, Arial, sans-serif" font-size="32" fill="#525252">Free copy-paste React &amp; Next.js components</text>
  <text x="474" y="420" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#a3a3a3">MIT licensed · Tailwind CSS · TypeScript</text>
</svg>`;

async function png(svg, file) {
  const out = path.join(root, file);
  await sharp(Buffer.from(svg)).png().toFile(out);
  return out;
}

/** Minimal ICO container holding one PNG image (supported by all modern browsers). */
function icoFromPng(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(6 + 16, 12);
  return Buffer.concat([header, entry, pngBuffer]);
}

const written = await Promise.all([
  png(mark(512), "public/logo.png"),
  png(mark(192), "public/icon-192.png"),
  png(mark(512), "public/icon-512.png"),
  png(ogImage, "public/og-image.png"),
]);

const favicon = await sharp(Buffer.from(mark(32)))
  .png()
  .toBuffer();
const icoPath = path.join(root, "app/favicon.ico");
await writeFile(icoPath, icoFromPng(favicon, 32));
written.push(icoPath);

for (const file of written) console.log(path.relative(root, file));
