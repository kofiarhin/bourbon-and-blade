import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Header.module.scss';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/barbers', label: 'Barbers' },
  { to: '/booking', label: 'Booking' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' }
];

const Header = () => {
  const { content } = useSiteContent();
  const business = content?.business || {};
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const closeDrawer = () => setOpen(false);
  const toggleDrawer = () => setOpen((value) => !value);
  const headerClassName = scrolled
    ? `${styles.header} ${styles.scrolled}`
    : styles.header;
  const drawerClassName = open
    ? `${styles.drawer} ${styles.open}`
    : styles.drawer;
  const backdropClassName = open
    ? `${styles.backdrop} ${styles.open}`
    : styles.backdrop;
  const burgerClassName = open
    ? `${styles.burger} ${styles.open}`
    : styles.burger;
  const getLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <header className={headerClassName}>
      <div className={styles.utility}>
        <span>{business.location}</span>
      </div>

      <div className={styles.bar}>
        <Link to="/" className={styles.logo} onClick={closeDrawer}>
          <span className={styles.logoText}>{business.name}</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={getLinkClass}
              onClick={closeDrawer}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.cta}>
          <Link to="/booking" className={styles.button} onClick={closeDrawer}>
            Book Now
          </Link>

          <button
            type="button"
            className={burgerClassName}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="primary-drawer"
            onClick={toggleDrawer}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="primary-drawer"
        className={drawerClassName}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.drawerInner}>
          {navItems.map((item) => (
            <NavLink
              key={`${item.to}-mobile`}
              to={item.to}
              end={item.end}
              className={getLinkClass}
              onClick={closeDrawer}
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/booking"
            className={`${styles.button} ${styles.buttonBlock}`}
            onClick={closeDrawer}
          >
            Book Now
          </Link>
        </div>
      </div>

      <button
        type="button"
        className={backdropClassName}
        aria-label="Close menu"
        onClick={closeDrawer}
      />
    </header>
  );
};

export default Header;
