import SectionHeading from '../../components/SectionHeading/SectionHeading.jsx';
import { useSiteContent } from '../../context/ContentContext.jsx';
import styles from './About.module.scss';

const About = () => {
  const { content } = useSiteContent();
  const aboutContent = content?.pages?.about || {};
  const story = aboutContent.story || {};
  const ethos = aboutContent.ethos || [];
  const owner = content?.business?.owner || "Marcus Johnson";

  return (
    <div className={styles.about}>
      <SectionHeading title={story.title || 'Our Story'} subtitle={story.description} />
      <section className={styles.ethos}>
        {ethos.map((item) => (
          <article key={item.title} className={styles.ethosCard}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>
      <section className={styles.ownerNote}>
        <h3>Led by {owner}</h3>
        <p>{aboutContent.ownerNote}</p>
      </section>
    </div>
  );
};

export default About;
