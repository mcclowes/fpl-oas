import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Fantasy Premier League API"
      description="Unofficial OpenAPI documentation for the Fantasy Premier League API."
    >
      <main className={styles.hero}>
        <h1 className={styles.title}>Fantasy Premier League API</h1>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <div className={styles.actions}>
          <Link className="button button--primary button--lg" to="/api">
            API reference
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/using-the-api"
          >
            Guides
          </Link>
        </div>
        <p className={styles.footnote}>
          17 endpoints under{' '}
          <code>https://fantasy.premierleague.com/api/</code>. The description is
          available as <a href={useBaseUrl('/openapi.yaml')}>openapi.yaml</a>.
        </p>
      </main>
    </Layout>
  );
}
