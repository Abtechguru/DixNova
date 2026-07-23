const fs = require('fs');
const path = require('path');

const slugDir = path.join(__dirname, '..', 'app', '[slug]');

if (fs.existsSync(slugDir)) {
  fs.rmSync(slugDir, { recursive: true, force: true });
  console.log("Successfully removed app/[slug] to fix Next.js route collision!");
} else {
  console.log("app/[slug] already removed.");
}
