// @ts-check

import { defineConfig, envField  } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkMath from "remark-math"
import rehypeMathjax from "rehype-mathjax"
import remarkGfm from "remark-gfm"
import { RehypeReferenceTranslation } from './src/lib/markdown/rehype-reference-translation';
import { rehypeHashStyleHeadings } from './src/lib/markdown/rehype-hash-style-headings';
import { rehypeSectionize } from './src/lib/markdown/rehype-sectionize';

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
    },
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: 'github-dark-high-contrast',
        },
        remarkPlugins:[
            remarkMath,
            remarkGfm,
        ],
        rehypePlugins:[
            RehypeReferenceTranslation,
            rehypeHeadingIds,
            rehypeHashStyleHeadings,
            rehypeSectionize,
            rehypeMathjax
        ],
    },
});