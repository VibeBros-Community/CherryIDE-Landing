#!/usr/bin/env node

/**
 * Generate blur placeholder data URLs for images
 * Used by Next.js Image component for progressive loading
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_IMAGES = join(__dirname, '..', 'public', 'images');

const images = [
  'logo-transparent.webp',
];

async function generateBlurPlaceholder(filename) {
  const inputPath = join(PUBLIC_IMAGES, filename);

  // Generate a tiny blurred version (10x10)
  const buffer = await sharp(inputPath)
    .resize(10, 10, { fit: 'inside' })
    .blur(5)
    .webp({ quality: 20 })
    .toBuffer();

  const base64 = buffer.toString('base64');
  const dataUrl = `data:image/webp;base64,${base64}`;

  console.log(`\n${filename}:`);
  console.log(`  Size: ${buffer.length} bytes`);
  console.log(`  Placeholder:`);
  console.log(`  "${dataUrl}"`);

  return dataUrl;
}

async function main() {
  console.log('Generating blur placeholders...\n');
  console.log('='.repeat(70));

  const placeholders = {};

  for (const image of images) {
    try {
      const placeholder = await generateBlurPlaceholder(image);
      placeholders[image] = placeholder;
    } catch (error) {
      console.error(`Error generating placeholder for ${image}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n✅ Blur placeholders generated!');
  console.log('\nAdd these to your Image components as blurDataURL prop:');
  console.log('\n<Image');
  console.log('  src="/images/logo-transparent.webp"');
  console.log('  blurDataURL="..."');
  console.log('  placeholder="blur"');
  console.log('/>');
}

main().catch(console.error);
