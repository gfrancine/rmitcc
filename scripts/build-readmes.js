/*

Generated with Gemini Fast 3
Original prompt:

I'm writing a NodeJS build script called build-week-readmes. 

This is a repository for my p5.js sketches with this structure:

(root)
  package.json (will run the script with npm run)
  ...
  scripts
    build-week-readmes.js (location of this script)
  public
    README.md <-- the gh-pages homepage
    sketches
      template
        ... (weekly template, see week01 below)
      week01
        README.md
        sketch1
          index.html
          sketch.js
          style.css
          thumbnail.png
        sketch2
          ... (same content)

On the top of every sketch.js file is a multiline comment with this exact structure:

```js
/*

Week 1
Sketch Title

* /
```

And the README files on every weekly folder are structured this way:

```md
# Week 3 - Typography

<!--REPLACE SKETCHES-->
<!--REPLACE SKETCHES-->
```

I need this script to:
- extract the titles of every sketch from the top comment
- generate bullet points of each sketch between the `<!--REPLACE SKETCHES-->`s on each README file in this format roughly:
```
## [Sketch Title](path/to/sketch folder)
![Sketch Title](path/to/thumbnail.png)
```
- in the README files, keep the heading 1 and `<!--REPLACE SKETCHES-->`s (so I can run this script again anytime)
- NOT touch the template folder at all.

Thank you!

*/

const fs = require("fs");
const path = require("path");

// Configuration
const SKETCHES_ROOT = path.join(__dirname, "../public/sketches");
const MARKER = "<!--REPLACE SKETCHES-->";

/**
 * Extracts the title from the specific comment structure:
 * /*
 * Week 1
 * Sketch Title
 * * /
 */
function getSketchTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const commentRegex = /\/\*[\s\S]*?Week\s+\d+\s*\n(.*?)\n[\s\S]*?\*\//;
    const match = content.match(commentRegex);

    // Return the title if found, otherwise fallback to folder name
    if (match) return match[1].trim();
  } catch (err) {
    return;
  }
}

function updateWeekReadmes() {
  // 1. Get all "week" directories, excluding 'template'
  const weeks = fs.readdirSync(SKETCHES_ROOT).filter((folder) => {
    const fullPath = path.join(SKETCHES_ROOT, folder);
    return fs.statSync(fullPath).isDirectory() && folder !== "template";
  });

  weeks.forEach((weekFolder) => {
    const weekPath = path.join(SKETCHES_ROOT, weekFolder);
    const readmePath = path.join(weekPath, "README.md");

    if (!fs.existsSync(readmePath)) {
      console.warn(`⚠️ No README.md found in ${weekFolder}, skipping.`);
      return;
    }

    // 2. Find all sketch subdirectories in this week
    const sketches = fs.readdirSync(weekPath).filter((folder) => {
      const fullPath = path.join(weekPath, folder);
      return (
        fs.statSync(fullPath).isDirectory() &&
        fs.existsSync(path.join(fullPath, "sketch.js"))
      );
    });

    // 3. Generate the Markdown list
    const sketchMarkdown = sketches
      .map((sketchFolder) => {
        const sketchFolderPath = path.join(weekPath, sketchFolder);
        const title = getSketchTitle(path.join(sketchFolderPath, "sketch.js"));

        // Edit: don't create an entry if it doesn't have a proper header
        if (!title) return "";

        // We use relative paths for the README links
        let entryStr = `\n## [${title}](${sketchFolder})`;

        // Edit: only add a thumbnail if it exists
        const THUMBNAIL_EXTS = ["png", "jpg", "jpeg", "svg", "gif"];

        for (const ext of THUMBNAIL_EXTS) {
          if (fs.existsSync(path.join(sketchFolderPath, "thumbnail." + ext))) {
            entryStr += `\n![${title}](${sketchFolder}/thumbnail.${ext})`;
            break;
          }
        }

        return entryStr + "\n";
      })
      .join("");

    // 4. Update the README content
    const readmeContent = fs.readFileSync(readmePath, "utf8");

    // Regex to find everything between the markers
    const markerRegex = new RegExp(`${MARKER}[\\s\\S]*${MARKER}`);
    const updatedContent = readmeContent.replace(
      markerRegex,
      `${MARKER}\n${sketchMarkdown}\n${MARKER}`,
    );

    fs.writeFileSync(readmePath, updatedContent);
    console.log(`✅ Updated README for ${weekFolder}`);
  });
}

updateWeekReadmes();
