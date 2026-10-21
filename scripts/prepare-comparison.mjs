import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// The two user-provided PNGs are the untouched originals. No generative edits,
// cropping, resizing, sharpening or geometric correction are applied.
const root = fileURLToPath(new URL('../', import.meta.url));
for (const name of ['before', 'after']) {
  const source = path.join(root, `public/images/comparison-${name}.png`);
  const image = sharp(source);
  const { width, height } = await image.metadata();
  if (width !== 1672 || height !== 941) throw new Error(`Unexpected ${name} dimensions`);
  const output = path.join(root, `public/images/comparison-${name}-scandi.webp`);
  await image.webp({ lossless: true }).toFile(output);
  const originalPixels = await sharp(source).raw().toBuffer();
  const optimizedPixels = await sharp(output).raw().toBuffer();
  if (!originalPixels.equals(optimizedPixels)) throw new Error(`Pixel mismatch: ${name}`);
  console.log(`${name}: original 1672 × 941 pixels preserved in lossless WebP.`);
}
