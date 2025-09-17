import { randomUUID } from 'node:crypto';
import { addFeedbackEntry } from '../data/mockDb.js';
import { assertString } from '../utils/validators.js';

const normalizeRating = (value) => {
  if (value === undefined || value === null || value === '') {
    return 5;
  }

  const numeric = Number(value);

  if (Number.isNaN(numeric) || numeric < 1 || numeric > 5) {
    return 5;
  }

  return Math.round(numeric);
};

const submitFeedback = ({ name = 'Anonymous', experience, rating = 5 }) => {
  const trimmedExperience = assertString(experience, 'Experience');
  const trimmedName = name ? name.trim() : 'Anonymous';
  const normalizedRating = normalizeRating(rating);

  return addFeedbackEntry({
    id: randomUUID(),
    name: trimmedName || 'Anonymous',
    experience: trimmedExperience,
    rating: normalizedRating,
    submittedAt: new Date().toISOString()
  });
};

export { submitFeedback };
