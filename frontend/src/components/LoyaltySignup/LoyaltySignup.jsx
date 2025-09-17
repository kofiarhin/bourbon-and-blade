import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './LoyaltySignup.module.scss';

const initialState = {
  name: '',
  email: ''
};

const LoyaltySignup = ({ onSubmit }) => {
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
      // keep inputs populated for retry
      // eslint-disable-next-line no-console
      console.debug('Loyalty registration blocked', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" value={formData.name} onChange={handleChange('name')} placeholder="Your name" required />
      </label>
      <label>
        Email
        <input type="email" value={formData.email} onChange={handleChange('email')} placeholder="you@example.com" required />
      </label>
      <button type="submit">Join Loyalty</button>
    </form>
  );
};

LoyaltySignup.propTypes = {
  onSubmit: PropTypes.func
};

LoyaltySignup.defaultProps = {
  onSubmit: undefined
};

export default LoyaltySignup;
