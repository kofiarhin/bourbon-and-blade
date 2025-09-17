import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Contact.module.scss';

const Contact = () => {
  const { content } = useSiteContent();
  const contactPage = content?.pages?.contact || {};
  const business = content?.business || {};
  const socials = business.socials || [];

  return (
    <div className={styles.contact}>
      <SectionHeading title={contactPage.title} subtitle={contactPage.headline} />
      {contactPage.parking ? <p className={styles.tip}>{contactPage.parking}</p> : null}
      <div className={styles.grid}>
        <section className={styles.card}>
          <h3>Contact</h3>
          <ul>
            <li>
              <strong>Phone:</strong> {business.phone}
            </li>
            <li>
              <strong>Email:</strong> {business.email}
            </li>
            <li>
              <strong>Address:</strong> {business.location}
            </li>
          </ul>
          <p>{contactPage.emailResponse}</p>
        </section>
        <section className={styles.card}>
          <h3>Hours</h3>
          <ul>
            {business.hours
              ? Object.entries(business.hours).map(([day, hours]) => (
                  <li key={day}>
                    <span className={styles.day}>{day}</span>
                    <span>{hours}</span>
                  </li>
                ))
              : null}
          </ul>
        </section>
        <section className={styles.card}>
          <h3>Social</h3>
          <ul>
            {socials.map((social) => (
              <li key={social.platform}>
                <a href={social.url} target="_blank" rel="noreferrer">
                  {social.platform}
                </a>
                <span>{social.handle}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Contact;
