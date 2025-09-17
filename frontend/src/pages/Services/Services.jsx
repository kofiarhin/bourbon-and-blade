import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Services.module.scss';

const Services = () => {
  const { content } = useSiteContent();
  const services = content?.services || [];
  const pageContent = content?.pages?.services || {};
  const addOns = pageContent.addOns || [];

  return (
    <div className={styles.services}>
      <SectionHeading title={pageContent.title} subtitle={pageContent.intro} />
      <section className={styles.servicesGrid}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            name={service.name}
            price={service.price}
            description={service.description}
            highlights={service.includes}
          />
        ))}
      </section>
      {addOns.length ? (
        <section className={styles.addOns}>
          <h3>{pageContent.addOnsTitle}</h3>
          <div className={styles.addOnGrid}>
            {addOns.map((addOn) => (
              <article key={addOn.name} className={styles.addOnCard}>
                <header>
                  <h4>{addOn.name}</h4>
                  <span>{addOn.price}</span>
                </header>
                <p>{addOn.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Services;
