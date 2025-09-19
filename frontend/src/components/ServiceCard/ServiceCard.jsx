import PropTypes from 'prop-types';
import styles from './ServiceCard.module.scss';

const ServiceCard = ({ name, price, description = '', highlights = [] }) => (
  <article className={styles.card}>
    <header>
      <h3>{name}</h3>
      <span className={styles.price}>{price}</span>
    </header>
    <p>{description}</p>
    {highlights?.length ? (
      <ul className={styles.highlights}>
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : null}
  </article>
);

ServiceCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string,
  highlights: PropTypes.arrayOf(PropTypes.string)
};

export default ServiceCard;
