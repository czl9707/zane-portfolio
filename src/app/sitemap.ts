import type { MetadataRoute } from 'next'
import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import * as ZaneDevBlogs from '@/lib/cms/zane-dev-blog'

const ROOT = "https://zane-portfolio.kiyo-n-zane.com/";

const singlePages = [
    `${ROOT}`,
    `${ROOT}about`,
    `${ROOT}as/architect/project`,
    `${ROOT}as/developer/project`,
    `${ROOT}as/developer/blog`,
]

export const revalidate = 14400;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const archProjects = await ZaneArchProjects.getAll();
    const devBlogs = await ZaneDevBlogs.getAll();

    return [
        ...(singlePages.map(p => ({
            url: p,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        })) as MetadataRoute.Sitemap),
        ...(archProjects.map((p) => ({
            url: `${ROOT}as/architect/project/${p.link}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        })) as MetadataRoute.Sitemap),
        ...(devBlogs.map((p) => ({
            url: `${ROOT}as/developer/blog/${p.link}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        })) as MetadataRoute.Sitemap)
    ]
}