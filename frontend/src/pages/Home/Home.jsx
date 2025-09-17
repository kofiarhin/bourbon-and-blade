import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx';
import SocialFeed from '../../components/SocialFeed/SocialFeed.jsx';
import LoyaltyBanner from '../../components/LoyaltyBanner/LoyaltyBanner.jsx';
import LoyaltySignup from '../../components/LoyaltySignup/LoyaltySignup.jsx';
import { joinLoyalty } from '../../services/apiClient.js';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Home.module.scss';

const Home = () => {
  const { content } = useSiteContent();
  const hero = content?.pages?.home?.hero || {};
  const sections = content?.pages?.home?.sections || {};
  const pillars = content?.pages?.home?.pillars || [];
  const services = content?.services?.slice(0, 3) || [];
  const loyalty = content?.loyalty || { headline: '', description: '', perks: [] };
  const posts = content?.socialFeed || [];
  const servicesSection = sections.services || {};
  const socialSection = sections.social || {};
  const pillarsSection = sections.pillars || {};
  const servicesIntro = content?.pages?.services?.intro;
  const [loyaltyStatus, setLoyaltyStatus] = useState({ message: '', tone: 'idle' });

  const handleLoyaltySubmit = async (formData) => {
    setLoyaltyStatus({ message: 'Welcoming you into the reserve...', tone: 'loading' });

    try {
      await joinLoyalty(formData);
      setLoyaltyStatus({ message: 'You are on the Blade & Bourbon Reserve list. Expect exclusive drops soon.', tone: 'success' });
      return true;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Unable to join right now. Please try again.';
      setLoyaltyStatus({ message, tone: 'error' });
      throw error;
    }
  };

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>{hero.headline}</h1>
          <p>{hero.subheadline}</p>
          <div className={styles.ctaGroup}>
            <Link to="/booking" className={styles.primaryCta}>
              {hero.cta}
            </Link>
            <Link to="/services" className={styles.secondaryCta}>
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.pillarsSection}>
        <SectionHeading title={pillarsSection.title} subtitle={pillarsSection.subtitle} />
        <div className={styles.pillars}>
          {pillars.map((pillar) => (
            <article key={pillar.title} className={styles.pillarCard}>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.servicesSection}>
        <SectionHeading title={servicesSection.title} subtitle={servicesIntro} />
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              price={service.price}
              description={service.description}
              highlights={service.includes}
            />
          ))}
        </div>
        <div className={styles.servicesCta}>
          <Link to="/booking" className={styles.primaryCta}>
            {servicesSection.cta}
          </Link>
        </div>
      </section>

      <section className={styles.experienceSection}>
        <div className={styles.loyaltyColumn}>
          <LoyaltyBanner headline={loyalty.headline} description={loyalty.description} perks={loyalty.perks} />
          <LoyaltySignup onSubmit={handleLoyaltySubmit} />
          {loyaltyStatus.message ? <p className={styles[loyaltyStatus.tone]}>{loyaltyStatus.message}</p> : null}
        </div>
        <div className={styles.feedWrapper}>
          <SectionHeading title={socialSection.title} subtitle={socialSection.subtitle} />
          <SocialFeed posts={posts} />
        </div>
      </section>
    </div>
  );
};

export default Home;
