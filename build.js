const fs = require("fs");
const path = require("path");

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy public/ to dist/
const publicDir = path.join(__dirname, "public");
const distDir = path.join(__dirname, "dist");

if (fs.existsSync(publicDir)) {
  copyDir(publicDir, distDir);
  console.log("Build complete: public/ -> dist/");
} else {
  console.error("Error: public/ directory not found");
  process.exit(1);
}