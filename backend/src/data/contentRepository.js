import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.resolve(currentDir, '../../../shared/content.json');

let cachedContent = null;
let lastLoadedAt = 0;

const loadContentFile = async () => {
  const file = await readFile(contentPath, 'utf-8');
  return JSON.parse(file);
};

const getContent = async () => {
  const shouldRefresh = !cachedContent || Date.now() - lastLoadedAt > 60_000;

  if (shouldRefresh) {
    cachedContent = await loadContentFile();
    lastLoadedAt = Date.now();
  }

  return cachedContent;
};

const getSection = async (key) => {
  const content = await getContent();

  if (content?.pages?.[key]) {
    return content.pages[key];
  }

  if (content?.[key]) {
    return content[key];
  }

  return null;
};

const resetCache = async () => {
  cachedContent = null;
  lastLoadedAt = 0;
  return getContent();
};

export { getContent, getSection, resetCache };
