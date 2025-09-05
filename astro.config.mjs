// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig, envField  } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://zane-portfolio.kiyo-n-zane.com',
    integrations: [sitemap(), react()],
    trailingSlash: "ignore",
    compressHTML: true,
    env: {
        schema: {
            ADMIN_URL: envField.number({ context: "server", access: "secret" }),
            ADMIN_APIKEY: envField.string({ context: "server", access: "secret" }),
        }
    }
});