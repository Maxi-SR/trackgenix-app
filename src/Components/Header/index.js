import styles from './header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <section className={styles.container}>
      <div className={styles.brand}>
        <Link to="/">
          <img className={styles.logo} src={`${process.env.PUBLIC_URL}/assets/images/radium.png`} />
        </Link>
        <div className={styles.appName}>Trackgenix</div>
      </div>
      <div className={styles.headline}>
        <img
          className={styles.hambMenu}
          src={`${process.env.PUBLIC_URL}/assets/images/hamb-menu.svg`}
        />
      </div>
    </section>
  );
};

export default Header;
