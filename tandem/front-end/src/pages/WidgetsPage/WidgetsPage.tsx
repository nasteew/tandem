import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card/Card';
import styles from './WidgetsPage.module.css';
import clsx from 'clsx';

interface Resource {
  title: string;
  description: string;
  link: string;
}

export const WidgetsPage = () => {
  const resources: Resource[] = [
    {
      title: 'Quiz',
      description: 'Quiz description',
      link: '/widgets/quiz',
    },
    {
      title: 'Memory Game',
      description: 'Memory Game description',
      link: '/widgets/memory',
    },
    {
      title: 'Async Sorter',
      description: 'Async Sort description',
      link: '/widgets/sorter',
    },
  ];

  return (
    <div className={clsx('container', styles.container)}>
      <div>
        <Link to="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <h1 className={styles.title}>Widgets</h1>
        <p className={styles.description}>
          Explore our collection of Widgets and practice your hard skills
        </p>
      </div>

      <div className={styles.grid}>
        {resources.map((resource) => (
          <Link to={resource.link} key={resource.link} style={{ textDecoration: 'none' }}>
            <Card title={resource.title}>
              <p>{resource.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WidgetsPage;
