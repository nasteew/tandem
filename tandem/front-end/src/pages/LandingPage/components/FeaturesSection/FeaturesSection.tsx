import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '../../../../components/Card/Card';
import { AgentIcon } from '../../../../components/icons/AgentIcon';
import { DashboardIcon } from '../../../../components/icons/DashboardIcon';
import { WidgetsIcon } from '../../../../components/icons/WidgetsIcon';
import { StatisticIcon } from '../../../../components/icons/StatisticIcon';
import styles from './FeaturesSection.module.css';

const FEATURES = [
  {
    id: 'ai-interview',
    key: 'aiInterview',
    icon: AgentIcon,
    path: '/agent',
  },
  {
    id: 'dashboard',
    key: 'dashboard',
    icon: DashboardIcon,
    path: '/dashboard',
  },
  {
    id: 'widgets',
    key: 'widgets',
    icon: WidgetsIcon,
    path: '/widgets',
  },
  {
    id: 'statistic',
    key: 'statistic',
    icon: StatisticIcon,
    path: '/statistic',
  },
];

export const FeaturesSection = forwardRef<HTMLElement>((props, ref) => {
  const { t } = useTranslation('features');

  return (
    <section ref={ref} aria-labelledby="features-title" className={styles.features}>
      <div className={styles.container}>
        <h2 id="features-title" className={styles.title}>
          {t('title.prefix')}<span className={styles.gradient}>{t('title.highlight')}</span>
        </h2>
        <p className={styles.subtitle}>
          {t('subtitle')}
        </p>

        <div className={styles.grid}>
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            const title = t(`items.${feature.key}.title`);
            const description = t(`items.${feature.key}.description`);

            return (
              <Link
                key={feature.id}
                to={feature.path}
                className={styles.cardLink}
                aria-label={t('ariaLearnMore', { title })}
              >
                <Card
                  icon={<IconComponent className={styles.cardIcon} />}
                  title={title}
                  description={description}
                  className={styles.featureCard}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';
