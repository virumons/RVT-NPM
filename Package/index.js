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
  execSync(`npx create-vite ${projectName} --template react`, { stdio: 'inherit' });
  execSync(`cd ${projectPath} && npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`, { stdio: 'inherit' });
  execSync(`npx tailwindcss init -p`, { stdio: 'inherit' });

  console.log('Setup completed successfully!');
}
