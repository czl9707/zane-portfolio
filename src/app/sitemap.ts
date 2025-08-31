import type { MetadataRoute } from 'next'
import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import * as ZaneBlog from '@/lib/cms/zane-blog'

const ROOT = "https://zane-portfolio.kiyo-n-zane.com/";

const singlePages = [
    `${ROOT}`,
    `${ROOT}about`,
    `${ROOT}project/by/architect/`,
    `${ROOT}project/by/developer`,
    `${ROOT}blog/by/developer`,
]

export const revalidate = 14400;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const archProjects = await ZaneArchProjects.getAll();
    const blogs = await ZaneBlog.getAll();

    return [
        ...(singlePages.map(p => ({
            url: p,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        })) as MetadataRoute.Sitemap),
        ...(archProjects.map((p) => ({
            url: `${ROOT}project/by/architect/${p.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        })) as MetadataRoute.Sitemap),
        ...(blogs.map((p) => ({
            url: `${ROOT}blog/by/developer/${p.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        })) as MetadataRoute.Sitemap)
    ]
}