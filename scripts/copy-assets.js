const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'app', 'public');
const destDir = path.join(__dirname, '..', 'public');

if (fs.existsSync(srcDir)) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  files.forEach(file => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied ${file} to public/`);
    }
  });

  // Create favicon.ico if it doesn't exist
  const logoFile = path.join(srcDir, 'logo.png');
  const faviconFile = path.join(destDir, 'favicon.ico');
  if (fs.existsSync(logoFile) && !fs.existsSync(faviconFile)) {
    fs.copyFileSync(logoFile, faviconFile);
    console.log('Created favicon.ico in public/');
  }
}
