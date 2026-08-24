import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const repo = 'https://github.com/mcclowes/fpl-oas';
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

const config: Config = {
  title: 'FPL API',
  tagline: 'Unofficial documentation for the Fantasy Premier League API.',
  url: vercelHost ? `https://${vercelHost}` : 'https://fpl-oas.vercel.app',
  baseUrl: '/',
  organizationName: 'mcclowes',
  projectName: 'fpl-oas',
  favicon: 'favicon.svg',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  plugins: [
    [
      'docusaurus-plugin-speccy',
      {
        route: '/api',
        spec: './static/openapi.yaml',
        renderer: {
          // Speccy takes one accent for both themes, so this is a lightened FPL
          // purple: the brand #37003c is unreadable on a dark background.
          accentColor: '#9d4edd',
          theme: 'inherit',
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: `${repo}/tree/main/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: { respectPrefersColorScheme: true },
    navbar: {
      title: 'FPL API',
      logo: { alt: '', src: 'favicon.svg' },
      items: [
        { to: '/api', label: 'Reference', position: 'right' },
        { to: '/docs/authentication', label: 'Guides', position: 'right' },
        { href: repo, label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Reference',
          items: [
            { label: 'API reference', to: '/api' },
            { label: 'Authentication', to: '/docs/authentication' },
            { label: 'Using the API', to: '/docs/using-the-api' },
          ],
        },
        {
          title: 'Contribute',
          items: [
            { label: 'Editing the spec', to: '/docs/contributing' },
            { label: 'GitHub', href: repo },
            { label: 'OMG', href: 'https://omg.gs' },
          ],
        },
      ],
      copyright:
        'Unofficial, community-maintained documentation. Not affiliated with or endorsed by the Premier League.',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
