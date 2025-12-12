import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './UserProfileView.module.css';

export default function UserProfileView() {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.userProfile}>
      <h1>User Profile</h1>
      <br />
      <p className={styles.profileGreeting}>Hello, {user.username}!</p>
    </div>
  );
}