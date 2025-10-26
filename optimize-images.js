const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  { input: 'public/images/home_avatar.png', output: 'public/images/home_avatar_optimized.png', size: 512 },
  { input: 'public/images/about_avatar.JPG', output: 'public/images/about_avatar_optimized.jpg', size: 512 },
  { input: 'public/images/work_avatar.jpeg', output: 'public/images/work_avatar_optimized.jpg', size: 512 },
  { input: 'public/images/life_avatar.jpeg', output: 'public/images/life_avatar_optimized.jpg', size: 512 },
];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  for (const img of imagesToOptimize) {
    try {
      const inputPath = path.join(__dirname, img.input);
      const outputPath = path.join(__dirname, img.output);

      // Get original size
      const originalStats = fs.statSync(inputPath);
      const originalSize = originalStats.size;

      // Optimize the image
      await sharp(inputPath)
        .resize(img.size, img.size, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath);

      // Get new size
      const newStats = fs.statSync(outputPath);
      const newSize = newStats.size;

      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

      console.log(`✅ ${path.basename(img.input)}`);
      console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Optimized: ${(newSize / 1024).toFixed(2)} KB`);
      console.log(`   Savings: ${savings}% (${((originalSize - newSize) / 1024 / 1024).toFixed(2)} MB)\n`);

    } catch (error) {
      console.error(`❌ Error optimizing ${img.input}:`, error.message);
    }
  }

  console.log('✅ Image optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Review the optimized images to ensure quality is acceptable');
  console.log('2. If satisfied, update your code to use the optimized versions');
  console.log('3. Backup and remove the original large files');
}

optimizeImages();