import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <section className={styles.container}>
    <ul className={styles.routes}>
      <li>
        <Link to="/">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/home.svg`} />
          <h2>Home</h2>
        </Link>
      </li>
      <li>
        <Link to="/admins">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          <h2>Admins</h2>
        </Link>
      </li>
      <li>
        <Link to="/super-admins">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          <h2>Super Admins</h2>
        </Link>
      </li>
      <li>
        <Link to="/projects">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          <h2>Projects</h2>
        </Link>
      </li>
      <li>
        <Link to="time-sheets">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          <h2>Timesheets</h2>
        </Link>
      </li>
      <li>
        <Link to="/tasks">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/list.svg`} />
          <h2>Tasks</h2>
        </Link>
      </li>
    </ul>
    <ul className={styles.routes}>
      <li>
        <Link to="/">
          <img className={styles.icon} src={`${process.env.PUBLIC_URL}/assets/images/logout.svg`} />
          <h2>Logout</h2>
        </Link>
      </li>
    </ul>
  </section>
);

export default Sidebar;
