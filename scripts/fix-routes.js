const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const oldPath = path.join(appDir, '(app)', '[orgSlug]');
const newParentDir = path.join(appDir, 'org');
const newPath = path.join(newParentDir, '[orgSlug]');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function rmDirRecursiveSync(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const curPath = path.join(dir, file);
      if (fs.statSync(curPath).isDirectory()) {
        rmDirRecursiveSync(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

try {
  console.log("Moving app/(app)/[orgSlug] to app/org/[orgSlug]...");
  copyRecursiveSync(oldPath, newPath);
  rmDirRecursiveSync(path.join(appDir, '(app)'));
  console.log("Successfully resolved route conflict!");
} catch (err) {
  console.error("Error moving routes:", err.message);
}
