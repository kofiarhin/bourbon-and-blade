import PropTypes from 'prop-types';
import styles from './BarberCard.module.scss';

const BarberCard = ({ name, role, bio = '', specialties = [] }) => (
  <article className={styles.card}>
    <header>
      <h3>{name}</h3>
      <span>{role}</span>
    </header>
    <p>{bio}</p>
    {specialties?.length ? (
      <ul className={styles.specialties}>
        {specialties.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : null}
  </article>
);

BarberCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  bio: PropTypes.string,
  specialties: PropTypes.arrayOf(PropTypes.string)
};

export default BarberCard;
