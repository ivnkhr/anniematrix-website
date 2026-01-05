import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const sourceDir = './public/img/abm_art';

async function convertImages() {
  const files = await readdir(sourceDir);
  const pngFiles = files.filter(f => f.endsWith('.png'));

  console.log(`Found ${pngFiles.length} PNG files to convert...`);

  for (const file of pngFiles) {
    const inputPath = join(sourceDir, file);
    const outputPath = join(sourceDir, file.replace('.png', '.jpg'));

    await sharp(inputPath)
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log(`✓ Converted ${file} to JPG`);
  }

  console.log('All images converted!');
}

convertImages();
