import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://phat0x8.nt-portfolio.workers.dev',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
