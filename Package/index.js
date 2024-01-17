#!/usr/bin/env node

const program = require('commander');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

program
  .version('1.0.0')
  .description('Create React project with Tailwind CSS using Vite')
  .arguments('<project-name>')
  .action((projectName) => {
    createReactTailwindCSSVite(projectName);
  })
  .parse(process.argv);

function createReactTailwindCSSVite(projectName) {
  const projectPath = path.resolve(projectName);

  // Check if the directory already exists
  if (fs.existsSync(projectPath)) {
    console.error(`Error: Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  console.log(`Creating a new React project with Tailwind CSS using Vite: ${projectName}`);
//   execSync(`Set-ExecutionPolicy Bypass -Scope Process -Force`,{stdio:'inherit'});
  execSync(`npx create-vite ${projectName} --template react`, { stdio: 'inherit' });
  execSync(`cd ${projectPath} && npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`, { stdio: 'inherit' });
  execSync(`cd ${projectPath} && npx tailwindcss init -p`, { stdio: 'inherit' });

  // Update index.css
  const indexPath = path.join(projectPath, 'src', 'index.css');
  const newIndexContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

  updateFileContent(indexPath, newIndexContent);

  // Update tailwind.config.js
  const configPath = path.join(projectPath, 'tailwind.config.js');
  const newConfigContent = `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;

  updateFileContent(configPath, newConfigContent);


  console.log('Setup completed successfully!');
}

function updateFileContent(filePath, newContent) {
  try {
    fs.writeFileSync(filePath, newContent);
    console.log(`File ${filePath} updated successfully.`);
  } catch (error) {
    console.error(`Error updating file ${filePath}: ${error.message}`);
  }
}
