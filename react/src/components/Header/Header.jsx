import Logo from '../../assets/logo.png';
import styles from './Header.module.css';

export default function Header() {
     return (
     <div className={styles.banner}>
          <img 
               src={Logo} 
               alt="Collective Cuddle Logo" 
               className={styles.bannerImage} 
          />
     <div className={styles.bannerText}>
     </div>
     </div>
     );
}
