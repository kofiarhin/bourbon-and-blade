import { Router } from 'express';
import { getContentController, getContentSectionController } from '../controllers/contentController.js';

const contentRouter = Router();

contentRouter.get('/', getContentController);
contentRouter.get('/:section', getContentSectionController);

export { contentRouter };
