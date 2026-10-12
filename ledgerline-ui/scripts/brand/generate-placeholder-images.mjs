/**
 * Renders original placeholder artwork into public/ for the images the
 * components reference (backgrounds, wallpapers, avatars, vehicles, footer).
 * Same filenames and dimensions as before, so no component code changes.
 * Swap any file for your own artwork whenever you like.
 *
 * Run: node scripts/brand/generate-placeholder-images.mjs
 */
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

const gradient = (w, h, stops, blobs = []) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      ${stops.map((c, i) => `<stop offset="${i / (stops.length - 1)}" stop-color="${c}"/>`).join("")}
    </linearGradient>
    <filter id="b"><feGaussianBlur stdDeviation="${Math.round(Math.min(w, h) / 8)}"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g filter="url(#b)" opacity="0.75">
    ${blobs.map(([cx, cy, r, c]) => `<circle cx="${cx * w}" cy="${cy * h}" r="${r * Math.min(w, h)}" fill="${c}"/>`).join("")}
  </g>
</svg>`;

// Neutral head-and-shoulders silhouette on a soft circle.
const avatar = (size, bg, skin, shirt) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="${bg}"/>
  <clipPath id="c"><circle cx="50" cy="50" r="50"/></clipPath>
  <g clip-path="url(#c)">
    <ellipse cx="50" cy="98" rx="34" ry="28" fill="${shirt}"/>
    <rect x="43" y="56" width="14" height="14" rx="6" fill="${skin}"/>
    <circle cx="50" cy="42" r="18" fill="${skin}"/>
  </g>
</svg>`;

// Generic flat sedan, side view, transparent background.
const car = `
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="960" viewBox="0 0 128 96">
  <ellipse cx="64" cy="72" rx="52" ry="4" fill="#000" opacity="0.12"/>
  <path d="M14 62c0-6 4-9 10-10l14-3 12-11c3-2 6-3 10-3h20c5 0 8 2 11 5l9 9 10 2c5 1 8 5 8 10v4c0 2-1 3-3 3H17c-2 0-3-1-3-3z" fill="#334155"/>
  <path d="M52 40c2-2 4-3 7-3h9v12H42z" fill="#cbd5e1"/>
  <path d="M71 37h8c3 0 5 1 7 3l7 9H71z" fill="#cbd5e1"/>
  <rect x="58" y="53" width="6" height="1.6" rx="0.8" fill="#94a3b8"/>
  <rect x="80" y="53" width="6" height="1.6" rx="0.8" fill="#94a3b8"/>
  <circle cx="36" cy="66" r="9" fill="#0f172a"/><circle cx="36" cy="66" r="4" fill="#94a3b8"/>
  <circle cx="96" cy="66" r="9" fill="#0f172a"/><circle cx="96" cy="66" r="4" fill="#94a3b8"/>
  <rect x="110" y="56" width="5" height="3" rx="1.5" fill="#fde68a"/>
</svg>`;

// Generic flat kick scooter, transparent background.
const scooter = `
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="539" viewBox="0 0 144 108">
  <ellipse cx="72" cy="94" rx="56" ry="3.5" fill="#000" opacity="0.12"/>
  <path d="M100 18l12 64" stroke="#334155" stroke-width="5" stroke-linecap="round"/>
  <path d="M90 16h20" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
  <rect x="32" y="76" width="72" height="8" rx="4" fill="#0f766e"/>
  <circle cx="34" cy="86" r="9" fill="#0f172a"/><circle cx="34" cy="86" r="3.5" fill="#94a3b8"/>
  <circle cx="112" cy="86" r="9" fill="#0f172a"/><circle cx="112" cy="86" r="3.5" fill="#94a3b8"/>
</svg>`;

// Abstract city skyline silhouette for the footer, transparent background.
function skyline(w, h) {
  let x = 0;
  let seed = 7;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const blocks = [];
  while (x < w) {
    const bw = 80 + rand() * 180;
    const bh = h * (0.25 + rand() * 0.6);
    blocks.push(
      `<rect x="${x.toFixed(0)}" y="${(h - bh).toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}"/>`,
    );
    x += bw + 6;
  }
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <g fill="#f1f5f9">${blocks.join("")}</g>
</svg>`;
}

const jobs = [
  [
    "public/background1.webp",
    gradient(
      493,
      493,
      ["#e0f2fe", "#f0fdfa"],
      [
        [0.3, 0.3, 0.35, "#5eead4"],
        [0.75, 0.7, 0.3, "#c4b5fd"],
      ],
    ),
  ],
  [
    "public/background4.webp",
    gradient(
      1600,
      1138,
      ["#fef3c7", "#fde2e4"],
      [
        [0.25, 0.4, 0.3, "#fda4af"],
        [0.7, 0.6, 0.35, "#fcd34d"],
      ],
    ),
  ],
  [
    "public/background5.webp",
    gradient(
      1148,
      1148,
      ["#ecfeff", "#eef2ff"],
      [
        [0.35, 0.65, 0.3, "#67e8f9"],
        [0.7, 0.3, 0.3, "#a5b4fc"],
      ],
    ),
  ],
  [
    "public/background6.webp",
    gradient(
      1148,
      1148,
      ["#f0fdf4", "#f5f3ff"],
      [
        [0.3, 0.3, 0.3, "#86efac"],
        [0.7, 0.75, 0.3, "#d8b4fe"],
      ],
    ),
  ],
  [
    "public/wallpaper-11.png",
    gradient(
      590,
      427,
      ["#0f172a", "#134e4a"],
      [
        [0.3, 0.7, 0.35, "#0d9488"],
        [0.8, 0.25, 0.3, "#4338ca"],
      ],
    ),
  ],
  [
    "public/wallpaper-2.png",
    gradient(
      1920,
      1280,
      ["#1e1b4b", "#0f766e"],
      [
        [0.25, 0.3, 0.3, "#6366f1"],
        [0.75, 0.7, 0.35, "#14b8a6"],
      ],
    ),
  ],
  ["public/profile-picture.png", avatar(512, "#ccfbf1", "#d6a77a", "#0f766e")],
  ["public/woman.png", avatar(512, "#ede9fe", "#c68b59", "#7c3aed")],
  ["public/car.png", car],
  ["public/scooter.png", scooter],
  ["public/footer.webp", skyline(4134, 1479)],
];

for (const [file, svg] of jobs) {
  const out = path.join(root, file);
  const img = sharp(Buffer.from(svg));
  await (file.endsWith(".webp") ? img.webp({ quality: 82 }) : img.png()).toFile(
    out,
  );
  console.log(file);
}
