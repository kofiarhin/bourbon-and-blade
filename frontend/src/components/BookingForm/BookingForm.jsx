import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './BookingForm.module.scss';

const initialState = {
  serviceId: '',
  barberId: 'any',
  date: '',
  time: '',
  clientName: '',
  clientEmail: ''
};

const BookingForm = ({ services, barbers, onSubmit }) => {
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
      // allow parent to surface the error while keeping the form state intact
      // eslint-disable-next-line no-console
      console.debug('Booking submission blocked', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Client Name
        <input
          type="text"
          value={formData.clientName}
          onChange={handleChange('clientName')}
          placeholder="Your name"
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={formData.clientEmail}
          onChange={handleChange('clientEmail')}
          placeholder="you@example.com"
        />
      </label>
      <label>
        Service
        <select value={formData.serviceId} onChange={handleChange('serviceId')} required>
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Barber
        <select value={formData.barberId} onChange={handleChange('barberId')}>
          <option value="any">Any available barber</option>
          {barbers.map((barber) => (
            <option key={barber.id} value={barber.id}>
              {barber.name}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.datetimeRow}>
        <label>
          Date
          <input type="date" value={formData.date} onChange={handleChange('date')} required />
        </label>
        <label>
          Time
          <input type="time" value={formData.time} onChange={handleChange('time')} required />
        </label>
      </div>
      <button type="submit">Book Appointment</button>
    </form>
  );
};

BookingForm.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  barbers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  onSubmit: PropTypes.func
};

BookingForm.defaultProps = {
  services: [],
  barbers: [],
  onSubmit: undefined
};

export default BookingForm;
