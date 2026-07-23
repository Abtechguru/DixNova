const fs = require('fs');
const path = require('path');

const pathsToDelete = [
  'app/about-smartmove',
  'app/admin',
  'app/api',
  'app/business-impact',
  'app/contact',
  'app/dashboard',
  'app/data-modeling',
  'app/data-preparation',
  'app/dataset-overview',
  'app/executive-summary',
  'app/kpi-framework',
  'app/objectives',
  'app/problem-statement',
  'app/recommendations',
  'app/roadmap',
  'app/solution',
  'app/team',
  'components/admin',
  'components/dashboard',
  'components/layout/CollapsibleSidebar.tsx',
  'components/layout/DashboardHeader.tsx',
  'components/layout/Footer.tsx',
  'components/layout/JudgesNavigation.tsx',
  'components/layout/Navbar.tsx',
  'components/layout/PresentationLayout.tsx',
  'components/layout/PresentationSidebar.tsx',
  'components/layout/Sidebar.tsx',
  'lib/data',
  'lib/services'
];

pathsToDelete.forEach((p) => {
  const fullPath = path.join(__dirname, '..', p);
  if (fs.existsSync(fullPath)) {
    try {
      if (fs.lstatSync(fullPath).isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`Deleted directory: ${p}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`Deleted file: ${p}`);
      }
    } catch (err) {
      console.error(`Failed to delete ${p}:`, err.message);
    }
  } else {
    console.log(`Path not found, skipping: ${p}`);
  }
});
