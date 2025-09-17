import PropTypes from 'prop-types';
import styles from './TestimonialCard.module.scss';

const TestimonialCard = ({ quote, client, service }) => (
  <blockquote className={styles.card}>
    <p>{quote}</p>
    <footer>
      <cite>{client}</cite>
      {service ? <span>{service}</span> : null}
    </footer>
  </blockquote>
);

TestimonialCard.propTypes = {
  quote: PropTypes.string.isRequired,
  client: PropTypes.string.isRequired,
  service: PropTypes.string
};

TestimonialCard.defaultProps = {
  service: ''
};

export default TestimonialCard;
