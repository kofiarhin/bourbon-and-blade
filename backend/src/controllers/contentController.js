import { getSiteContent, getContentSection } from '../services/contentService.js';

const getContentController = async (req, res, next) => {
  try {
    const content = await getSiteContent();
    res.json(content);
  } catch (error) {
    next(error);
  }
};

const getContentSectionController = async (req, res, next) => {
  try {
    const { section } = req.params;
    const sectionContent = await getContentSection(section);

    if (!sectionContent) {
      res.status(404).json({ message: `Content section '${section}' not found` });
      return;
    }

    res.json(sectionContent);
  } catch (error) {
    next(error);
  }
};

export { getContentController, getContentSectionController };
