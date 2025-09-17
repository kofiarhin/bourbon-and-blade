import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FeedbackForm.module.scss';

const initialState = {
  name: '',
  experience: '',
  rating: 5
};

const FeedbackForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!onSubmit) {
      return;
    }

    try {
      const result = await onSubmit(formData);
      if (result !== false) {
        setFormData(initialState);
      }
    } catch (error) {
      // keep the form populated so the guest can adjust and retry
      // eslint-disable-next-line no-console
      console.debug('Feedback submission blocked', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" value={formData.name} onChange={handleChange('name')} placeholder="Optional" />
      </label>
      <label>
        Experience
        <textarea value={formData.experience} onChange={handleChange('experience')} required rows={4} />
      </label>
      <label>
        Rating
        <input type="number" min="1" max="5" value={formData.rating} onChange={handleChange('rating')} />
      </label>
      <button type="submit">Share Feedback</button>
    </form>
  );
};

FeedbackForm.propTypes = {
  onSubmit: PropTypes.func
};

FeedbackForm.defaultProps = {
  onSubmit: undefined
};

export default FeedbackForm;
