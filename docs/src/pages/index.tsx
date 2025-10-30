import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          {siteConfig.tagline}
        </p>

        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/intro">
            Get Started with Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <div className="col col--4">
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <Link className="button button--primary" to={link}>Explore</Link>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="IRIS-Instant Docs"
      description="Comprehensive documentation for IRIS-Instant project — covering setup, architecture, and CI/CD.">
      <HomepageHeader />
      <main>
        <section className="container margin-vert--xl">
          <div className="row">
            <Feature
              title="Docker"
              description="Understand containerization and how IRIS-Instant leverages Docker for isolated builds."
              link="/docs/ci-cd/docker/intro"
            />
            <Feature
              title="Jenkins"
              description="Learn to automate builds and deployments with Jenkins pipelines integrated with Docker."
              link="/docs/ci-cd/jenkins/intro"
            />
            <Feature
              title="Demo Setup"
              description="Step-by-step local setup for Angular + Spring Boot + PostgreSQL using Docker & Jenkins."
              link="/docs/ci-cd/demo/setup"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
