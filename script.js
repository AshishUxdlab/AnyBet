const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'apps/web/src');
const componentsDir = path.join(__dirname, 'packages/ui/src/components');

// 1. Get available shadcn components
const shadcnComponents = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.tsx') && f !== '.gitkeep')
  .map(f => f.replace('.tsx', ''));

console.log('Available Shadcn Components:', shadcnComponents.join(', '));

// 2. Scan web app for non-shadcn elements and custom styling hacks
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
      const lines = content.split('\n');
      
      lines.forEach((line, idx) => {
        const lineNum = idx + 1;
        
        // Check for raw HTML input/button tags
        if (line.match(/<button[\s>]/) && !fullPath.includes('bottom-navbar.tsx')) {
          results.push(`[Raw Element] Line ${lineNum} in ${file}: Found raw <button> instead of Shadcn Button`);
        }
        if (line.match(/<input[\s>]/) && !line.includes('type="radio"') && !line.includes('type="checkbox"')) {
          results.push(`[Raw Element] Line ${lineNum} in ${file}: Found raw <input> instead of Shadcn Input`);
        }
        
        // Check for inline style attributes (excluding standard provider style configurations)
        if (line.includes('style={{') && !line.includes('CSSProperties')) {
          results.push(`[Custom Style] Line ${lineNum} in ${file}: Found inline styles 'style={{...}}'`);
        }
        
        // Check for arbitrary Tailwind classes indicating custom ad-hoc layouts (e.g., bg-[#123], h-[23px])
        // exclude safe items like layout skeletons h-[200px] or custom sidebar-width
        if (line.match(/(bg|text|border|w|h|shadow)-\[/) && !line.includes('h-[200px]') && !line.includes('w-[250px]') && !line.includes('h-[120px]') && !line.includes('h-[80px]') && !line.includes('--sidebar-width') && !line.includes('bottom-[')) {
          results.push(`[Arbitrary Tailwind] Line ${lineNum} in ${file}: Found arbitrary styling: ${line.trim()}`);
        }
      });
    }
  }
  return results;
}

const warnings = scanDir(srcDir);
console.log('\n--- Analysis Results ---');
if (warnings.length > 0) {
  console.log(warnings.join('\n'));
} else {
  console.log('All good! Code base is clean of raw elements and custom styling hacks.');
}
