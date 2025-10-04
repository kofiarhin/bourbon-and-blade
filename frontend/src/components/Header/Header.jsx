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
  const business = content?.business || { name: 'Blade & Bourbon', location: '21 King Street, Leeds, LS1 2HL' };

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? 'hidden' : prev;
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const closeDrawer = () => setOpen(false);
  const toggleDrawer = () => setOpen(v => !v);

  const headerClass = scrolled ? `${styles.header} ${styles.scrolled}` : styles.header;
  const drawerClass = open ? `${styles.drawer} ${styles.open}` : styles.drawer;
  const backdropClass = open ? `${styles.backdrop} ${styles.open}` : styles.backdrop;
  const burgerClass = open ? `${styles.burger} ${styles.open}` : styles.burger;
  const getLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <header className={headerClass}>
      {/* Utility bar */}
      <div className={styles.utility}>
        <span>{business.location}</span>
      </div>

      {/* Main header bar */}
      <div className={styles.bar}>
        <Link to="/" className={styles.logo} onClick={closeDrawer}>
          <span className={styles.logoText}>{business.name}</span>
        </Link>

        <nav id="primary-navigation" className={styles.nav} aria-label="Primary">
          {navItems.map(item => (
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
          <Link
            to="/booking"
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={closeDrawer}
            aria-label="Book Now"
          >
            Book Now
          </Link>

          <button
            type="button"
            className={burgerClass}
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

      {/* Drawer */}
      <div
        id="primary-drawer"
        className={drawerClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="primary-navigation"
      >
        <button
          type="button"
          className={styles.drawerClose}
          onClick={closeDrawer}
          aria-label="Close menu"
        />
        <div className={styles.drawerInner}>
          {navItems.map(item => (
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
            className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonBlock}`}
            onClick={closeDrawer}
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Backdrop */}
      <button
        type="button"
        className={backdropClass}
        aria-label="Close menu"
        onClick={closeDrawer}
      />
    </header>
  );
};

export default Header;