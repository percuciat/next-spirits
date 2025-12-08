import { SpiritsBoard } from '@/widgets/spirits-board';
import styles from './page.module.scss';

export default function MonitoringPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Yokai Monitoring</h1>
          <p className={styles.subtitle}>Tokyo Spirit Anomaly Detection System</p>
        </div>
        <div className={styles.status}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>LIVE</span>
        </div>
      </header>
      
      <SpiritsBoard />
    </main>
  );
}

