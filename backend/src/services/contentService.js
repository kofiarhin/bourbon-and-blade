import { getContent as loadContent, getSection as loadSection } from '../data/contentRepository.js';

const getSiteContent = async () => loadContent();

const getContentSection = async (sectionKey) => loadSection(sectionKey);

export { getSiteContent, getContentSection };
