import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContentProvider, useSiteContent } from './context/ContentContext.jsx';
import useSeo from './hooks/useSeo.js';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Services from './pages/Services/Services.jsx';
import Gallery from './pages/Gallery/Gallery.jsx';
import Booking from './pages/Booking/Booking.jsx';
import Testimonials from './pages/Testimonials/Testimonials.jsx';
import Contact from './pages/Contact/Contact.jsx';
import Barbers from './pages/Barbers/Barbers.jsx';

const AppRouter = () => {
  const { isLoading, error, content } = useSiteContent();

  useSeo(content?.seo);

  if (isLoading) {
    return (
      <div className="app-loading">
        <p>Preparing the Blade & Bourbon experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>We hit a snag loading the experience.</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/barbers" element={<Barbers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <ContentProvider>
    <AppRouter />
  </ContentProvider>
);

export default App;
