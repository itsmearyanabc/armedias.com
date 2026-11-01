// Builds src/assets/logo-mark.png (the header logo) from brand/logo-source.webp, which has a
// transparent background. Run: npm run logo
import sharp from 'sharp';

// Crop first in its own pass: sharp would otherwise trim before extracting
const mark = await sharp('brand/logo-source.webp')
  .extract({ left: 330, top: 105, width: 815, height: 600 }) // the "AR" + bird symbol
  .toBuffer();

await sharp(mark)
  .trim({ threshold: 1 })
  .resize({ width: 240 })
  .png({ compressionLevel: 9 })
  .toFile('src/assets/logo-mark.png');
console.log('wrote src/assets/logo-mark.png');
