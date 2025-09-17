import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import styles from './MainLayout.module.scss';

const MainLayout = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);

export default MainLayout;
