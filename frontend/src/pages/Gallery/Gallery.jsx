import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './Gallery.module.scss';

const Gallery = () => {
  const { content } = useSiteContent();
  const galleryContent = content?.gallery?.highlights || [];
  const description = content?.pages?.gallery?.description;

  return (
    <div className={styles.gallery}>
      <SectionHeading title={content?.pages?.gallery?.title} subtitle={description} />
      <div className={styles.grid}>
        {galleryContent.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.imagePlaceholder} aria-label={item.title} role="img" />
            <div className={styles.meta}>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
