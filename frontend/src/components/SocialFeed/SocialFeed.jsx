import PropTypes from 'prop-types';
import styles from './SocialFeed.module.scss';

const SocialFeed = ({ posts }) => (
  <section className={styles.feed}>
    {posts?.length ? (
      posts.map((post) => (
        <article key={post.id} className={styles.post}>
          <header>
            <span>{post.platform}</span>
            <time dateTime={post.date}>{post.date}</time>
          </header>
          <p>{post.content}</p>
          {post.link ? (
            <a href={post.link} target="_blank" rel="noreferrer">
              View Post
            </a>
          ) : null}
        </article>
      ))
    ) : (
      <p className={styles.empty}>Social highlights coming soon.</p>
    )}
  </section>
);

SocialFeed.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      platform: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      link: PropTypes.string
    })
  )
};

SocialFeed.defaultProps = {
  posts: []
};

export default SocialFeed;
