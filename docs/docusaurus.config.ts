import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'IRIS-Instant Docs',
  tagline:
    'Comprehensive documentation for IRIS-Instant project — from setup to deployment',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://iris-instant.example.com', // replace when you have production URL
  baseUrl: '/',

  organizationName: 'your-org', // e.g. GitHub org/user
  projectName: 'iris-instant-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // makes docs the homepage (optional)
          sidebarPath: './sidebars.ts', // you can replace later if using auto sidebars
        },
        blog: false, // Disable if you’re not maintaining a blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/iris-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
      defaultMode: 'light',
    },
    navbar: {
      title: 'IRIS-Instant',
      logo: {
        alt: 'IRIS-Instant Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'iris-instant/overview',
          position: 'left',
          label: 'Overview',
        },
        {
          type: 'doc',
          docId: 'cicd/intro',
          position: 'left',
          label: 'CI/CD',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'docker', 'java', 'typescript', 'sql'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
