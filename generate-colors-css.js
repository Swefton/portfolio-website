import { CSS_VARS } from "./src/styles/colors.js";

import fs from "fs";
import path from "path";

const lines = [];
lines.push(":root {");

for (const [varName, colorValue] of Object.entries(CSS_VARS)) {
  lines.push(`  ${varName}: ${colorValue};`);
}

lines.push("}");

const cssContent = lines.join("\n");

fs.writeFileSync(
  path.resolve("src/styles/colors.css"),
  cssContent,
  "utf8"
);

console.log("colors.css generated from colors.js");
