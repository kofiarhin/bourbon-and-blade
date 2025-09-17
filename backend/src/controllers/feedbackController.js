import { submitFeedback } from '../services/feedbackService.js';

const submitFeedbackController = (req, res, next) => {
  try {
    const feedback = submitFeedback(req.body || {});
    res.status(201).json({
      feedbackId: feedback.id,
      submittedAt: feedback.submittedAt,
      rating: feedback.rating
    });
  } catch (error) {
    next(error);
  }
};

export { submitFeedbackController };
