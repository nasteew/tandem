import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card/Card';
import styles from './LandingPage.module.css';
import clsx from 'clsx';

interface Page {
  title: string;
  description: string;
  path: string;
}

export const LandingPage = () => {
  const pages: Page[] = [
    {
      title: 'Authentication',
      description: 'Login or Registration',
      path: '/auth',
    },
    {
      title: 'Statistic',
      description: 'User statistics',
      path: '/statistic',
    },
    {
      title: 'Widgets',
      description: 'Practice your hard skills',
      path: '/widgets',
    },
    {
      title: 'Profile',
      description: 'User settings and profile management.',
      path: '/profile',
    },
    {
      title: 'AI Agent',
      description: 'AI chat interface mock.',
      path: '/agent',
    },
  ];

  return (
    <div className={clsx('container', styles.container)}>
      <h1 className={styles.title}>Tandem</h1>
      <p className={styles.description}>
        Practice your hard skills
        <br />
        Prepare for a technical interview
      </p>

      <div className={styles.grid}>
        {pages.map((page) => (
          <Link to={page.path} key={page.path} style={{ textDecoration: 'none' }}>
            <Card title={page.title}>
              <p>{page.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
