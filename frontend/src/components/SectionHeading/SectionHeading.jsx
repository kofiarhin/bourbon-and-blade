import PropTypes from 'prop-types';
import styles from './SectionHeading.module.scss';

const SectionHeading = ({ title, subtitle = '' }) => (
  <div className={styles.heading}>
    <h2>{title}</h2>
    {subtitle ? <p>{subtitle}</p> : null}
  </div>
);

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default SectionHeading;
