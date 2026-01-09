// @ts-check

import { defineConfig, envField, fontProviders  } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkMath from "remark-math"
import rehypeMathjax from "rehype-mathjax"
import remarkGfm from "remark-gfm"
import { rehypeExternalLinkAttr } from './src/lib/markdown/rehype-external-link-attr';
import { rehypeHashStyleHeadings } from './src/lib/markdown/rehype-hash-style-headings';
import { rehypeSectionize } from './src/lib/markdown/rehype-sectionize';
import { remarkImageTranslation } from './src/lib/markdown/remark-img-translation';
import { remarkReferenceTranslation } from './src/lib/markdown/remark-reference-translation';

// https://astro.build/config
export default defineConfig({
    site: 'https://zane-portfolio.kiyo-n-zane.com',

    integrations: [
        sitemap({
            filter(path){return !path.includes("/as/")}
        }), 
        react()
    ],

    trailingSlash: "ignore",
    compressHTML: true,

    env: {
        schema: {
            ADMIN_URL: envField.number({ context: "server", access: "secret" }),
            ADMIN_APIKEY: envField.string({ context: "server", access: "secret" }),
        }
    },

    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: 
        {
            themes: {
                light: 'github-light-high-contrast',
                dark: 'github-dark-high-contrast',
            },
            defaultColor: false,
        },
        remarkPlugins:[
            remarkReferenceTranslation,
            remarkImageTranslation,
            remarkMath,
            remarkGfm,
        ],
        rehypePlugins:[
            rehypeExternalLinkAttr,
            rehypeHeadingIds,
            rehypeHashStyleHeadings,
            rehypeSectionize,
            rehypeMathjax
        ],
    },

    redirects: {
        "/as/developer/blog": "/blog",
        "/as/architect/project": "/project/by/architect",
        "/as/developer/project": "/project/by/developer",
    },

    experimental: {
        fonts: [{
            provider: fontProviders.fontsource(),
            name: "Red Hat Mono",
            cssVariable: "--font-mono",
            weights: [400, 500, 600, 700]
    }]
  }
});