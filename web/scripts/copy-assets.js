#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectsDir = path.join(__dirname, "..", "..", "projects");
const publicDir = path.join(__dirname, "..", "public", "projects");

// public/projects 디렉토리 생성
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 각 프로젝트 폴더에서 파일을 복사
if (fs.existsSync(projectsDir)) {
  const folders = fs.readdirSync(projectsDir);

  for (const folder of folders) {
    const folderPath = path.join(projectsDir, folder);
    const publicFolderPath = path.join(publicDir, folder);
    const stat = fs.statSync(folderPath);

    if (!stat.isDirectory()) continue;

    // 대상 폴더 생성
    if (!fs.existsSync(publicFolderPath)) {
      fs.mkdirSync(publicFolderPath, { recursive: true });
    }

    // 파일 복사 (PDF, 이미지 등)
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      // .gitkeep 파일은 복사하지 않음
      if (file === ".gitkeep") continue;

      const srcFile = path.join(folderPath, file);
      const destFile = path.join(publicFolderPath, file);
      const fileStat = fs.statSync(srcFile);

      if (fileStat.isFile()) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Copied: ${srcFile} -> ${destFile}`);
      }
    }
  }

  console.log("Assets copied successfully!");
} else {
  console.log("Projects directory not found, skipping asset copy.");
}
