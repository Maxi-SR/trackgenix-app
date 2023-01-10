import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.logos}>
        <a
          href={'https://www.linkedin.com/company/radium-rocket/'}
          target={'_blank'}
          rel="noreferrer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/linkedin.svg`}
            className={styles.icon}
          />
        </a>
        <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            className={styles.icon}
          />
        </a>
        <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            className={styles.icon}
          />
        </a>
        <a href="https://twitter.com/radiumrocket" target={'_blank'} rel="noreferrer">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            className={styles.icon}
          />
        </a>
        <a href="https://github.com/radiumrocketapps" target={'_blank'} rel="noreferrer">
          <img src={`${process.env.PUBLIC_URL}/assets/images/github.svg`} className={styles.icon} />
        </a>
      </div>
      <div className={styles.copyright}>Rosario, Argentina</div>
      <div className={styles.copyright}>
        Copyright © {new Date().getFullYear()} Radium Rocket. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
