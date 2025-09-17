import { useEffect, useState } from 'react';
import { getContent } from '../services/apiClient.js';

const useContent = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await getContent();
        setContent(data);
      } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Unable to load site content';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  return { content, isLoading, error };
};

export default useContent;
