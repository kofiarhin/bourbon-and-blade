import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';
import useContent from '../hooks/useContent.js';

const ContentContext = createContext({
  content: null,
  isLoading: true,
  error: ''
});

const ContentProvider = ({ children }) => {
  const value = useContent();
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

ContentProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const useSiteContent = () => useContext(ContentContext);

export { ContentProvider, useSiteContent, ContentContext };
