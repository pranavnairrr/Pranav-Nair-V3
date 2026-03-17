const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

const src = path.join(__dirname, '..', '.next', 'static');
const dest = path.join(__dirname, '..', 'public', '_next', 'static');

// Clean old static files first
if (fs.existsSync(dest)) fs.rmSync(path.join(__dirname, '..', 'public', '_next'), { recursive: true });

copyDir(src, dest);
console.log('✓ Copied .next/static → public/_next/static');
