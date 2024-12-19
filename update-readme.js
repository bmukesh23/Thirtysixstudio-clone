import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the Lighthouse report
const reportPath = path.join(__dirname, 'lhci-report', 'report.json');

// Read the Lighthouse report JSON
const getLighthouseReport = () => {
  try {
    const reportContent = fs.readFileSync(reportPath, 'utf-8');
    return JSON.parse(reportContent);
  } catch (error) {
    console.error("Error reading or parsing the Lighthouse report:", error.message);
  }
};


// Extract scores
const extractScores = (report) => {
  if (!report || !report.categories) {
    throw new Error("Invalid Lighthouse report format.");
  }
  const performance = report.categories.performance?.score * 100 || 0;
  const accessibility = report.categories.accessibility?.score * 100 || 0;
  const bestPractices = report.categories['best-practices']?.score * 100 || 0;
  const seo = report.categories.seo?.score * 100 || 0;

  return { performance, accessibility, bestPractices, seo};
};

// Create a string with the scores
const createScoreString = (scores) => {
  const { performance, accessibility, bestPractices, seo} = scores;
  return `
  ## 💈Lighthouse Report (Page Speed Scores)
  
  - **Performance:** ${performance}/100
  - **Accessibility:** ${accessibility}/100
  - **Best Practices:** ${bestPractices}/100
  - **SEO:** ${seo}/100
  `;
};

// Update the README with the new scores
const updateReadme = (newScores) => {
  const readmePath = path.join(__dirname, './README.md');
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');

  // Replace the old Lighthouse section or append new one
  readmeContent = readmeContent.replace(/## 💈Lighthouse Report.*/s, newScores);

  // Write the updated README back to the file
  fs.writeFileSync(readmePath, readmeContent);
};

// Main function to run the process
const main = () => {
  const report = getLighthouseReport();
  const scores = extractScores(report);
  const scoresString = createScoreString(scores);
  updateReadme(scoresString);
};

main();