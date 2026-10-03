/**
 * Genera iconos PWA a partir de public/assets/branding/bon-appetit-app-icon.png
 * No deforma: contain + fondo marca. Maskable con margen de seguridad (~72%).
 *
 *   node scripts/generate-pwa-icons.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcPath = path.join(
  root,
  'public/assets/branding/bon-appetit-app-icon.png',
);
const outDir = path.join(root, 'public');

/** Fondo alineado con theme/splash (#0f1410). */
const BG = { r: 15, g: 20, b: 16, alpha: 1 };

async function containSquare(size, outName) {
  const buf = await sharp(srcPath)
    .resize(size, size, {
      fit: 'contain',
      background: BG,
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();
  const out = path.join(outDir, outName);
  fs.writeFileSync(out, buf);
  const meta = await sharp(buf).metadata();
  return { outName, width: meta.width, height: meta.height, bytes: buf.length };
}

/** Maskable: contenido al ~72% del canvas (safe zone Android ~80%). */
async function maskableSquare(size, outName, contentRatio = 0.72) {
  const inner = Math.round(size * contentRatio);
  const content = await sharp(srcPath)
    .resize(inner, inner, {
      fit: 'contain',
      background: BG,
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();

  const buf = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: content, gravity: 'centre' }])
    .png()
    .toBuffer();

  const out = path.join(outDir, outName);
  fs.writeFileSync(out, buf);
  const meta = await sharp(buf).metadata();
  return { outName, width: meta.width, height: meta.height, bytes: buf.length };
}

const results = [];
results.push(await containSquare(192, 'pwa-192.png'));
results.push(await containSquare(512, 'pwa-512.png'));
results.push(await maskableSquare(512, 'pwa-512-maskable.png', 0.72));
results.push(await containSquare(180, 'apple-touch-icon.png'));
results.push(await containSquare(32, 'favicon-32.png'));
results.push(await containSquare(48, 'favicon-48.png'));

console.log(JSON.stringify({ source: srcPath, results }, null, 2));
