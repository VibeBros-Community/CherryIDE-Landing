#!/usr/bin/env node

/**
 * Image optimization script using sharp
 * Converts PNG images to WebP format with compression
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_IMAGES = join(__dirname, '..', 'public', 'images');

const optimizations = [
  {
    input: 'logo.png',
    output: 'logo.webp',
    quality: 90,
    targetSize: '~80KB'
  },
  {
    input: 'logo-transparent.png',
    output: 'logo-transparent.webp',
    quality: 90,
    targetSize: '~60KB'
  },
  {
    input: 'IDE.png',
    output: 'IDE.webp',
    quality: 85,
    targetSize: '~40KB'
  }
];

async function getFileSize(filePath) {
  try {
    const stats = await stat(filePath);
    return (stats.size / 1024).toFixed(2) + ' KB';
  } catch {
    return 'N/A';
  }
}

async function optimizeImage(inputFile, outputFile, quality) {
  const inputPath = join(PUBLIC_IMAGES, inputFile);
  const outputPath = join(PUBLIC_IMAGES, outputFile);

  console.log(`\nOptimizing: ${inputFile}`);
  const originalSize = await getFileSize(inputPath);
  console.log(`Original size: ${originalSize}`);

  await sharp(inputPath)
    .webp({ quality, effort: 6 })
    .toFile(outputPath);

  const optimizedSize = await getFileSize(outputPath);
  console.log(`WebP size: ${optimizedSize}`);
  console.log(`Output: ${outputFile}`);
}

async function main() {
  console.log('Starting image optimization...\n');
  console.log('='.repeat(50));

  for (const { input, output, quality, targetSize } of optimizations) {
    try {
      await optimizeImage(input, output, quality);
      console.log(`Target: ${targetSize} ✓`);
    } catch (error) {
      console.error(`Error optimizing ${input}:`, error.message);
    }
    console.log('='.repeat(50));
  }

  console.log('\n✅ Image optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Update Image components to use .webp files');
  console.log('2. Add <picture> tags for progressive enhancement');
  console.log('3. Consider adding blur placeholders for better UX');
}

main().catch(console.error);
