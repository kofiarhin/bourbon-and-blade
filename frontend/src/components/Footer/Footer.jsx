import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Footer.module.scss';

const Footer = () => {
  const { content } = useSiteContent();
  const business = content?.business || {};
  const socials = business.socials || [];

  return (
    <footer className={styles.footer}>
      <div className={styles.details}>
        <span>© {new Date().getFullYear()} {business.name || 'Blade & Bourbon'}</span>
        <span>{business.location}</span>
      </div>
      <div className={styles.links}>
        {socials.map((social) => (
          <a key={social.platform} href={social.url} target="_blank" rel="noreferrer">
            {social.platform}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
