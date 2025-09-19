import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.resolve(currentDir, "../../../shared/content.json");

console.log("Current directory:", currentDir);
console.log("Content path:", contentPath);

try {
  const file = await readFile(contentPath, "utf-8");
  const content = JSON.parse(file);
  console.log("Content loaded successfully");
  console.log("Business name:", content.business?.name);
} catch (error) {
  console.error("Error loading content:", error.message);
}
