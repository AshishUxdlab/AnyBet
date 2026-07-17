const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'apps/web/src');
const componentsDir = path.join(__dirname, 'packages/ui/src/components');

// 1. Get available shadcn components
const shadcnComponents = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.tsx') && f !== '.gitkeep')
  .map(f => f.replace('.tsx', ''));

console.log('Available Shadcn Components:', shadcnComponents.join(', '));

// 2. Scan web app for non-shadcn elements that should be components
function scanDir(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      results = results.concat(scanDir(fullPath));
    } else if (file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Look for plain <button> tags
      if (content.match(/<button[\s>]/)) {
        results.push(`Found raw <button> in ${fullPath.replace(srcDir, '')}`);
      }
      
      // Look for plain <input> tags
      if (content.match(/<input[\s>]/)) {
        results.push(`Found raw <input> in ${fullPath.replace(srcDir, '')}`);
      }
    }
  }
  return results;
}

const warnings = scanDir(srcDir);
console.log('\n--- Analysis Results ---');
if (warnings.length > 0) {
  console.log(warnings.join('\n'));
} else {
  console.log('All good! No raw <button> or <input> elements found. Shadcn components are being used.');
}
