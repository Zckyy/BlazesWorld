/**
 * Generates the illustrated sample gallery (public/sample/blaze-*.svg).
 * Run with: node scripts/generate-sample-photos.mjs
 *
 * Each card is a small flat-art scene of a cat, so the gallery looks
 * intentional (not broken) before the Google Photos feed is configured.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sample')
mkdirSync(outDir, { recursive: true })

// ---------------------------------------------------------------- helpers
const star = (x, y, s, fill, o = 0.9) =>
  `<path d="M${x} ${y - s} L${x + s * 0.3} ${y - s * 0.3} L${x + s} ${y} L${x + s * 0.3} ${y + s * 0.3} L${x} ${y + s} L${x - s * 0.3} ${y + s * 0.3} L${x - s} ${y} L${x - s * 0.3} ${y - s * 0.3} Z" fill="${fill}" opacity="${o}"/>`

const paw = (x, y, s, fill, o = 0.5, rot = 0) => `
  <g transform="translate(${x} ${y}) rotate(${rot})" fill="${fill}" opacity="${o}">
    <ellipse cx="0" cy="${s * 0.45}" rx="${s * 0.62}" ry="${s * 0.5}"/>
    <circle cx="${-s * 0.62}" cy="${-s * 0.18}" r="${s * 0.22}"/>
    <circle cx="${-s * 0.22}" cy="${-s * 0.42}" r="${s * 0.22}"/>
    <circle cx="${s * 0.22}" cy="${-s * 0.42}" r="${s * 0.22}"/>
    <circle cx="${s * 0.62}" cy="${-s * 0.18}" r="${s * 0.22}"/>
  </g>`

const heart = (x, y, s, fill, o = 0.95) =>
  `<path transform="translate(${x} ${y}) scale(${s / 24})" d="M0 6 C-2 0 -10 0 -10 7 C-10 12 -4 16 0 20 C4 16 10 12 10 7 C10 0 2 0 0 6 Z" fill="${fill}" opacity="${o}"/>`

const whiskers = (cx, cy, r, stroke) => {
  const w = []
  for (const side of [-1, 1]) {
    for (const [dy, tilt] of [[-4, -7], [6, 0], [16, 7]]) {
      const x1 = cx + side * r * 0.42
      const y1 = cy + r * 0.28 + dy
      const x2 = cx + side * (r * 1.25)
      const y2 = y1 + tilt
      w.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="4" stroke-linecap="round" opacity="0.85"/>`)
    }
  }
  return w.join('')
}

/** Cat head with ears, face details. mood: 'happy' | 'sleepy' | 'wink' | 'curious' */
const catHead = (cx, cy, r, c, mood = 'happy') => {
  const earH = r * 0.95
  const ear = (side) => {
    const bx = cx + side * r * 0.78
    const tipX = cx + side * r * 0.95
    return `<path d="M${bx - side * r * 0.52} ${cy - r * 0.55} L${tipX} ${cy - earH} L${bx + side * r * 0.18} ${cy - r * 0.05} Z" fill="${c.cat}"/>
      <path d="M${bx - side * r * 0.3} ${cy - r * 0.52} L${tipX - side * r * 0.06} ${cy - earH * 0.82} L${bx + side * r * 0.04} ${cy - r * 0.18} Z" fill="${c.earInner}"/>`
  }
  const eyeY = cy - r * 0.08
  const eyeDX = r * 0.4
  let eyes
  if (mood === 'sleepy') {
    eyes = [-1, 1]
      .map((s) => `<path d="M${cx + s * eyeDX - r * 0.16} ${eyeY} Q${cx + s * eyeDX} ${eyeY + r * 0.16} ${cx + s * eyeDX + r * 0.16} ${eyeY}" stroke="${c.detail}" stroke-width="5" fill="none" stroke-linecap="round"/>`)
      .join('')
  } else if (mood === 'wink') {
    eyes =
      `<circle cx="${cx - eyeDX}" cy="${eyeY}" r="${r * 0.12}" fill="${c.detail}"/>` +
      `<path d="M${cx + eyeDX - r * 0.16} ${eyeY} Q${cx + eyeDX} ${eyeY + r * 0.16} ${cx + eyeDX + r * 0.16} ${eyeY}" stroke="${c.detail}" stroke-width="5" fill="none" stroke-linecap="round"/>`
  } else {
    const ry = mood === 'curious' ? r * 0.16 : r * 0.12
    eyes = [-1, 1]
      .map((s) => `<ellipse cx="${cx + s * eyeDX}" cy="${eyeY}" rx="${r * 0.12}" ry="${ry}" fill="${c.detail}"/>`)
      .join('')
  }
  const noseY = cy + r * 0.22
  return `
    ${ear(-1)}${ear(1)}
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${c.cat}"/>
    ${eyes}
    <path d="M${cx - r * 0.1} ${noseY} L${cx + r * 0.1} ${noseY} L${cx} ${noseY + r * 0.12} Z" fill="${c.nose}"/>
    <path d="M${cx} ${noseY + r * 0.12} q0 ${r * 0.12} ${-r * 0.14} ${r * 0.14} M${cx} ${noseY + r * 0.12} q0 ${r * 0.12} ${r * 0.14} ${r * 0.14}" stroke="${c.detail}" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${whiskers(cx, cy, r, c.whisker)}`
}

/** Sitting cat with curled tail. */
const catSit = (cx, baseY, s, c, mood = 'happy') => `
  <path d="M${cx + s * 0.52} ${baseY - s * 0.1} q${s * 0.62} ${s * 0.08} ${s * 0.55} ${-s * 0.62}" stroke="${c.cat}" stroke-width="${s * 0.2}" fill="none" stroke-linecap="round" class="tail"/>
  <ellipse cx="${cx}" cy="${baseY - s * 0.62}" rx="${s * 0.62}" ry="${s * 0.72}" fill="${c.cat}"/>
  <ellipse cx="${cx - s * 0.22}" cy="${baseY - s * 0.04}" rx="${s * 0.16}" ry="${s * 0.09}" fill="${c.catLight}"/>
  <ellipse cx="${cx + s * 0.22}" cy="${baseY - s * 0.04}" rx="${s * 0.16}" ry="${s * 0.09}" fill="${c.catLight}"/>
  ${catHead(cx, baseY - s * 1.5, s * 0.42, c, mood)}`

/** Loafing cat (the bread position). */
const catLoaf = (cx, cy, s, c, mood = 'sleepy') => `
  <path d="M${cx + s * 0.78} ${cy + s * 0.28} q${s * 0.5} ${-s * 0.05} ${s * 0.38} ${-s * 0.42}" stroke="${c.cat}" stroke-width="${s * 0.16}" fill="none" stroke-linecap="round"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${s}" ry="${s * 0.58}" fill="${c.cat}"/>
  ${catHead(cx - s * 0.62, cy - s * 0.5, s * 0.38, c, mood)}`

const yarnBall = (x, y, r, fill, lineFill) => `
  <circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>
  <path d="M${x - r} ${y} a${r} ${r} 0 0 1 ${2 * r} 0 M${x - r * 0.82} ${y - r * 0.5} q${r} ${r * 0.8} ${r * 1.7} ${r * 0.2} M${x - r * 0.7} ${y + r * 0.55} q${r * 0.8} ${-r * 0.9} ${r * 1.45} ${-r * 0.1}"
    stroke="${lineFill}" stroke-width="5" fill="none" opacity="0.8"/>`

const crescent = (x, y, r, fill) =>
  `<path d="M${x} ${y - r} a${r} ${r} 0 1 0 0 ${2 * r} a${r * 0.78} ${r * 0.78} 0 1 1 0 ${-2 * r} Z" fill="${fill}"/>`

const svg = (w, h, c, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${c.bgFrom}"/><stop offset="1" stop-color="${c.bgTo}"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.42" r="0.55">
      <stop offset="0" stop-color="${c.halo}" stop-opacity="0.55"/><stop offset="1" stop-color="${c.halo}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#halo)"/>
  ${body}
</svg>`

// --------------------------------------------------------------- palettes
const sunset = { bgFrom: '#ffd9a8', bgTo: '#ff9d6b', halo: '#fff3c4', cat: '#a14d22', catLight: '#c96d3c', earInner: '#e8956b', detail: '#5b2a12', nose: '#ff8fab', whisker: '#fff3e0' }
const cream = { bgFrom: '#fff3df', bgTo: '#ffd9b8', halo: '#ffffff', cat: '#e8823c', catLight: '#f4a468', earInner: '#ffc9a3', detail: '#5b2f15', nose: '#f06292', whisker: '#fff8ef' }
const pinky = { bgFrom: '#ffe3ef', bgTo: '#ffb8d4', halo: '#fff0f6', cat: '#8c5e54', catLight: '#a8786d', earInner: '#e8a3a0', detail: '#4a2c26', nose: '#e2528f', whisker: '#fff0f0' }
const nightP = { bgFrom: '#2b2550', bgTo: '#171430', halo: '#7c6bd4', cat: '#3b3266', catLight: '#4c4180', earInner: '#5d4f97', detail: '#cdc3f5', nose: '#f495c4', whisker: '#9d92cc' }
const dusk = { bgFrom: '#4b3a78', bgTo: '#251d45', halo: '#ff9d6b', cat: '#2a2248', catLight: '#3a3060', earInner: '#4a3d75', detail: '#bcaef0', nose: '#f495c4', whisker: '#8d81c0' }
const mint = { bgFrom: '#e0f5e8', bgTo: '#ffe8c2', halo: '#ffffff', cat: '#d97735', catLight: '#eb9659', earInner: '#ffc9a3', detail: '#54300f', nose: '#f06292', whisker: '#fff8ef' }

// ----------------------------------------------------------------- scenes
const cards = [
  ['blaze-01', 800, 1000, sunset, (c) => `${paw(120, 180, 30, '#ffffff', 0.35, -15)}${paw(660, 280, 24, '#ffffff', 0.3, 20)}${star(680, 130, 14, '#fff3c4')}${catSit(400, 870, 260, c, 'happy')}`],
  ['blaze-02', 800, 800, cream, (c) => `${star(120, 140, 16, '#ffb86b', 0.7)}${star(660, 600, 12, '#ffb86b', 0.6)}${paw(680, 160, 26, '#e8823c', 0.3, 18)}${catHead(400, 420, 190, c, 'happy')}`],
  ['blaze-03', 800, 600, cream, (c) => `${paw(110, 480, 24, '#e8823c', 0.25, -12)}${star(680, 120, 14, '#ffb86b', 0.7)}${catLoaf(420, 380, 240, c, 'sleepy')}<ellipse cx="420" cy="530" rx="270" ry="26" fill="#a14d22" opacity="0.15"/>`],
  ['blaze-04', 800, 1066, mint, (c) => `${yarnBall(560, 880, 90, '#e2528f', '#ffd6e8')}<path d="M560 790 q-120 -60 -60 -170 q50 -90 -40 -130" stroke="#e2528f" stroke-width="7" fill="none" stroke-dasharray="2 14" stroke-linecap="round"/>${catSit(330, 940, 250, c, 'curious')}${star(660, 180, 15, '#f5b73f', 0.8)}`],
  ['blaze-05', 800, 800, nightP, (c) => `${star(130, 130, 16, '#f5e08a')}${star(660, 200, 12, '#f5e08a', 0.7)}${star(580, 90, 9, '#ffffff', 0.6)}${star(180, 620, 10, '#f5e08a', 0.5)}${catHead(400, 430, 185, c, 'curious')}`],
  ['blaze-06', 800, 640, dusk, (c) => `${crescent(620, 150, 70, '#f5e08a')}${star(180, 110, 12, '#f5e08a', 0.8)}${star(420, 80, 8, '#ffffff', 0.6)}${star(290, 190, 9, '#f5e08a', 0.5)}${catSit(280, 580, 190, c, 'curious')}<ellipse cx="400" cy="600" rx="330" ry="22" fill="#000000" opacity="0.18"/>`],
  ['blaze-07', 800, 1000, cream, (c) => `${paw(140, 200, 26, '#e8823c', 0.35, -18)}${paw(650, 150, 22, '#e8823c', 0.3, 14)}${paw(680, 420, 26, '#e8823c', 0.25, -8)}${paw(110, 520, 22, '#e8823c', 0.28, 10)}${catSit(400, 880, 255, c, 'happy')}`],
  ['blaze-08', 800, 600, pinky, (c) => `${heart(660, 140, 30, '#e2528f', 0.7)}${heart(130, 220, 20, '#e2528f', 0.5)}${catLoaf(410, 390, 235, c, 'sleepy')}<ellipse cx="410" cy="535" rx="265" ry="24" fill="#8c5e54" opacity="0.16"/>`],
  ['blaze-09', 800, 800, sunset, (c) => `${heart(620, 220, 38, '#ffffff', 0.85)}${heart(180, 580, 22, '#ffffff', 0.6)}${catHead(400, 430, 185, c, 'wink')}`],
  ['blaze-10', 800, 1066, pinky, (c) => `<path d="M120 140 q220 60 160 230 q-50 150 130 200" stroke="#e2528f" stroke-width="8" fill="none" stroke-dasharray="3 16" stroke-linecap="round"/>${yarnBall(160, 120, 70, '#e2528f', '#ffd6e8')}${catSit(440, 950, 250, c, 'curious')}`],
  ['blaze-11', 800, 640, nightP, (c) => `${crescent(150, 130, 55, '#f5e08a')}${star(420, 100, 11, '#f5e08a', 0.8)}${star(620, 170, 14, '#f5e08a')}${star(700, 80, 8, '#ffffff', 0.6)}${star(530, 250, 7, '#ffffff', 0.5)}${catLoaf(420, 470, 230, c, 'sleepy')}<ellipse cx="420" cy="610" rx="280" ry="20" fill="#000000" opacity="0.25"/>`],
  ['blaze-12', 800, 1000, dusk, (c) => `${star(150, 160, 13, '#f5e08a', 0.8)}${star(650, 120, 10, '#ffffff', 0.6)}${star(680, 320, 8, '#f5e08a', 0.5)}${catSit(400, 880, 265, c, 'happy')}${paw(150, 700, 22, '#bcaef0', 0.25, -10)}`],
]

for (const [name, w, h, palette, scene] of cards) {
  writeFileSync(join(outDir, `${name}.svg`), svg(w, h, palette, scene(palette)))
  console.log(`✓ ${name}.svg (${w}×${h})`)
}
console.log(`\nDone — ${cards.length} sample cards written to public/sample/`)
