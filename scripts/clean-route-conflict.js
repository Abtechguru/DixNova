const fs = require('fs');
const path = require('path');

const conflictingFile = path.join(__dirname, '..', 'app', '(app)', 'page.tsx');

if (fs.existsSync(conflictingFile)) {
  try {
    fs.unlinkSync(conflictingFile);
    console.log('Successfully removed conflicting route file app/(app)/page.tsx');
  } catch (e) {
    console.error('Error removing conflicting file:', e.message);
  }
}
