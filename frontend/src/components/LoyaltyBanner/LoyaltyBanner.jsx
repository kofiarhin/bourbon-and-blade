import PropTypes from 'prop-types';
import styles from './LoyaltyBanner.module.scss';

const LoyaltyBanner = ({ headline, description, perks = [] }) => (
  <section className={styles.banner}>
    <h3>{headline}</h3>
    <p>{description}</p>
    {perks?.length ? (
      <ul>
        {perks.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>
    ) : null}
  </section>
);

LoyaltyBanner.propTypes = {
  headline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  perks: PropTypes.arrayOf(PropTypes.string)
};

export default LoyaltyBanner;
