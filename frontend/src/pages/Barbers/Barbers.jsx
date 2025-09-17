import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import BarberCard from '../../components/BarberCard/BarberCard.jsx';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Barbers.module.scss';

const Barbers = () => {
  const { content } = useSiteContent();
  const pageContent = content?.pages?.barbers || {};
  const barbers = content?.barbers || [];

  return (
    <div className={styles.barbers}>
      <SectionHeading title={pageContent.headline || 'Our Barbers'} subtitle={pageContent.description} />
      <div className={styles.grid}>
        {barbers.map((barber) => (
          <BarberCard
            key={barber.id}
            name={barber.name}
            role={barber.role}
            bio={barber.bio}
            specialties={barber.specialties}
          />
        ))}
      </div>
    </div>
  );
};

export default Barbers;
