import { getSiteContent } from '../services/contentService.js';

const getSocialFeedController = async (req, res, next) => {
  try {
    const content = await getSiteContent();
    res.json(content?.socialFeed || []);
  } catch (error) {
    next(error);
  }
};

export { getSocialFeedController };
