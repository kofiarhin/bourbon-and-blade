import { useEffect } from 'react';

const useSeo = (seo) => {
  useEffect(() => {
    if (!seo) {
      return;
    }

    if (seo.title) {
      document.title = seo.title;
    }

    if (seo.description) {
      let descriptionTag = document.querySelector('meta[name="description"]');
      if (!descriptionTag) {
        descriptionTag = document.createElement('meta');
        descriptionTag.setAttribute('name', 'description');
        document.head.appendChild(descriptionTag);
      }
      descriptionTag.setAttribute('content', seo.description);
    }

    if (seo.keywords?.length) {
      let keywordTag = document.querySelector('meta[name="keywords"]');
      if (!keywordTag) {
        keywordTag = document.createElement('meta');
        keywordTag.setAttribute('name', 'keywords');
        document.head.appendChild(keywordTag);
      }
      keywordTag.setAttribute('content', seo.keywords.join(', '));
    }
  }, [seo]);
};

export default useSeo;
