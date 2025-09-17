import { useState } from 'react';
import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard.jsx';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm.jsx';
import { submitFeedback } from '../../services/apiClient.js';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Testimonials.module.scss';

const Testimonials = () => {
  const { content } = useSiteContent();
  const testimonials = content?.testimonials || [];
  const testimonialsPage = content?.pages?.testimonials || {};
  const feedbackContent = content?.feedback || {};
  const [status, setStatus] = useState({ message: '', tone: 'idle' });

  const handleFeedbackSubmit = async (formData) => {
    setStatus({ message: 'Capturing your feedback...', tone: 'loading' });

    try {
      await submitFeedback(formData);
      setStatus({ message: 'Thank you. The team reviews every note within 24 hours.', tone: 'success' });
      return true;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'We could not record your feedback. Please try again.';
      setStatus({ message, tone: 'error' });
      throw error;
    }
  };

  return (
    <div className={styles.testimonials}>
      <SectionHeading title={testimonialsPage.title || 'Client Testimonials'} subtitle={testimonialsPage.subtitle} />
      <div className={styles.grid}>
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} quote={item.quote} client={item.client} service={item.service} />
        ))}
      </div>
      <section className={styles.feedbackSection}>
        <h3>{feedbackContent.headline}</h3>
        <p>{feedbackContent.description}</p>
        <FeedbackForm onSubmit={handleFeedbackSubmit} />
        {status.message ? <p className={styles[status.tone]}>{status.message}</p> : null}
      </section>
    </div>
  );
};

export default Testimonials;
