import { NavLink } from 'react-router-dom';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Header.module.scss';

const Header = () => {
  const { content } = useSiteContent();
  const business = content?.business || {};

  const getLinkClass = ({ isActive }) => (isActive ? styles.active : undefined);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.name}>{business.name}</span>
        <span className={styles.tagline}>{business.location}</span>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" className={getLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/about" className={getLinkClass}>
          About
        </NavLink>
        <NavLink to="/services" className={getLinkClass}>
          Services
        </NavLink>
        <NavLink to="/gallery" className={getLinkClass}>
          Gallery
        </NavLink>
        <NavLink to="/barbers" className={getLinkClass}>
          Barbers
        </NavLink>
        <NavLink to="/booking" className={getLinkClass}>
          Booking
        </NavLink>
        <NavLink to="/testimonials" className={getLinkClass}>
          Testimonials
        </NavLink>
        <NavLink to="/contact" className={getLinkClass}>
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
