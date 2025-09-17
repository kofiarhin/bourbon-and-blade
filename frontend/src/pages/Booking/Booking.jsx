import { useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import BookingForm from '../../components/BookingForm/BookingForm.jsx';
import { createBooking } from '../../services/apiClient.js';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Booking.module.scss';

const toLabel = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const Booking = () => {
  const { content } = useSiteContent();
  const bookingContent = content?.booking || {};
  const bookingPage = content?.pages?.booking || {};
  const services = (content?.services || []).map((service) => ({
    id: service.id,
    name: service.name
  }));
  const barbers = (content?.barbers || []).map((barber) => ({
    id: barber.id,
    name: barber.name
  }));
  const [status, setStatus] = useState({ message: '', tone: 'idle', confirmation: null });

  const handleSubmit = async (formData) => {
    setStatus({ message: 'Securing your chair...', tone: 'loading', confirmation: null });

    try {
      const booking = await createBooking(formData);
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'long',
        timeStyle: 'short'
      }).format(new Date(booking.datetime));

      setStatus({
        message: `Reserved with ${booking.assignedBarber.name} on ${formattedDate}. Let the bourbon ritual begin.`,
        tone: 'success',
        confirmation: booking
      });

      return true;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'We could not finalise your booking. Please try again.';
      setStatus({ message, tone: 'error', confirmation: null });
      throw error;
    }
  };

  return (
    <div className={styles.booking}>
      <SectionHeading title={bookingPage.title} subtitle={bookingPage.subtitle} />
      <p className={styles.intro}>{bookingContent.intro}</p>
      <div className={styles.layout}>
        <div className={styles.formColumn}>
          <BookingForm services={services} barbers={barbers} onSubmit={handleSubmit} />
          {status.message ? <p className={styles[status.tone]}>{status.message}</p> : null}
          {status.confirmation ? (
            <div className={styles.confirmation}>
              <p>
                <strong>Service:</strong> {status.confirmation.service.name} ({status.confirmation.service.price})
              </p>
              <p>
                <strong>Barber:</strong> {status.confirmation.assignedBarber.name}
              </p>
            </div>
          ) : null}
        </div>
        <div className={styles.detailsColumn}>
          <section>
            <h3>{bookingPage.cta}</h3>
            <ol>
              {(bookingContent.steps || []).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section>
            <h3>Policies</h3>
            <ul>
              {bookingContent.policies
                ? Object.entries(bookingContent.policies).map(([policy, detail]) => (
                    <li key={policy}>
                      <strong>{toLabel(policy)}:</strong> {detail}
                    </li>
                  ))
                : null}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Booking;
