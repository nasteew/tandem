import { Link } from 'react-router-dom';
import { Card } from '../../../../components/Card/Card';
import { AgentIcon } from '../../../../components/icons/AgentIcon';
import { DashboardIcon } from '../../../../components/icons/DashboardIcon';
import { WidgetsIcon } from '../../../../components/icons/WidgetsIcon';
import { StatisticIcon } from '../../../../components/icons/StatisticIcon';
import styles from './FeaturesSection.module.css';

const FEATURES = [
  {
    id: 'ai-interview',
    title: 'AI Interview',
    description:
      'Realistic technical interviews with AI. Practice anytime and get instant feedback.',
    icon: AgentIcon,
    path: '/agent',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description:
      'Track your progress with detailed analytics. Visualize successes and areas for improvement.',
    icon: DashboardIcon,
    path: '/dashboard',
  },
  {
    id: 'widgets',
    title: 'Widgets',
    description:
      'Interactive widgets for practicing algorithms and data structures. Learn through visualization.',
    icon: WidgetsIcon,
    path: '/widgets',
  },
  {
    id: 'statistic',
    title: 'Statistics',
    description:
      'Detailed statistics of your achievements. Analyze your results and set new goals.',
    icon: StatisticIcon,
    path: '/statistic',
  },
];

interface FeaturesSectionProps {
  ref?: React.RefObject<HTMLElement>;
}

export const FeaturesSection = ({ ref }: FeaturesSectionProps) => {
  return (
    <section ref={ref} aria-labelledby="features-title" className={styles.features}>
      <div className={styles.container}>
        <h2 id="features-title" className={styles.title}>
          Everything you need to <span className={styles.gradient}>succeed</span>
        </h2>
        <p className={styles.subtitle}>
          Comprehensive tools and features to master technical interviews
        </p>

        <div className={styles.grid}>
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon;

            return (
              <Link
                key={feature.id}
                to={feature.path}
                className={styles.cardLink}
                aria-label={`Learn more about ${feature.title}`}
              >
                <Card
                  icon={<IconComponent className={styles.cardIcon} />}
                  title={feature.title}
                  description={feature.description}
                  className={styles.featureCard}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
