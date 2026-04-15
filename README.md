# Explore Sketches

The public site homepage is located in the [public](public/) subfolder.

# Developing

```sh
# Install dependencies
npm i

# Opens the homepage in http://localhost:3000
npm start

# Format the source code
npm run fmt

# Builds the README files inside the `public` folder
npm run build

# Deploy the `public` folder to GitHub Pages
npm run deploy
```

## Pre-Commit

Make sure to build the READMEs and format all files (in that order) prior to making a commit.

```sh
npm run precommit # runs `npm run build && npm run fmt`
```
