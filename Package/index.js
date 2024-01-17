#!/usr/bin/env node
/**
 * Copyright (c) 2024-present.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * Author : viraj avinash Kulkarni | virajkulkarni85@gmail.com
 * package version: 1.0.0 - beta.1
 * initial version of package 
 */

/**
 * The below code performs the one-liner starter command for React-tailwind using vite 
 * command - npm i -g create-react-tailwindcss <filename>
 * if any policy error displayed use - Set-ExecutionPolicy Bypass -Scope Process -Force
 */

// used commander - used for developer and to help with CLI related operations
const program = require('commander');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Define the CLI options and commands using the 'commander' library
program
  .version('1.0.0')  // Set the version of the CLI tool
  .description('Create React project with Tailwind CSS using Vite')  // Set the description of the CLI tool
  .arguments('<project-name>')  // Define a required argument for the project name
  .action((projectName) => {  // Define the action to be taken when the CLI tool is invoked
    createReactTailwindCSSVite(projectName);  // Call the function to create the React project with Tailwind CSS using Vite
  })
  .parse(process.argv);  // Parse the command-line arguments

// Function to create a React project with Tailwind CSS using Vite
function createReactTailwindCSSVite(projectName) {
  const projectPath = path.resolve(projectName);  // Resolve the absolute path for the project

  // Check if the directory already exists
  if (fs.existsSync(projectPath)) {
    console.error(`Error: Directory "${projectName}" already exists.`);
    process.exit(1);  // Exit the process with an error code
  }

  // Display a message indicating the creation of a new React project with Tailwind CSS using Vite
  console.log(`Creating a new React project with Tailwind CSS using Vite: ${projectName}`);
  
  // Execute commands using execSync to set up the React project and install dependencies
  execSync(`npx create-vite ${projectName} --template react`, { stdio: 'inherit' });
  execSync(`cd ${projectPath} && npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`, { stdio: 'inherit' });
  execSync(`cd ${projectPath} && npx tailwindcss init -p`, { stdio: 'inherit' });

  // Update index.css with Tailwind CSS styles
  const indexPath = path.join(projectPath, 'src', 'index.css');
  const newIndexContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

  updateFileContent(indexPath, newIndexContent);

  // Update tailwind.config.js with the Tailwind CSS configuration
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

  // Display a message indicating the successful completion of the setup
  console.log('Setup completed successfully!');
}

// Function to update the content of a file
function updateFileContent(filePath, newContent) {
  try {
    fs.writeFileSync(filePath, newContent);
    console.log(`File ${filePath} updated successfully.`);
  } catch (error) {
    console.error(`Error updating file ${filePath}: ${error.message}`);
  }
}
