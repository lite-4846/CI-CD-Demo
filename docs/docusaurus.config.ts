import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'DevOps Docs',
  tagline:
    'Comprehensive documentation for DevOps — from setup to deployment',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://devops.example.com', // replace when you have production URL
  baseUrl: '/',

  organizationName: 'your-org', // e.g. GitHub org/user
  projectName: 'devops-docs',

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
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
      defaultMode: 'light',
    },
    navbar: {
      title: 'DevOps',
      logo: {
        alt: 'DevOps Logo',
        src: 'img/logo.svg',
      },
      items: [
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
