import type { MetadataRoute } from 'next'
import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'

const singlePages = [
    'https://zane-portfolio.kiyo-n-zane.com/',
    'https://zane-portfolio.kiyo-n-zane.com/about',
    'https://zane-portfolio.kiyo-n-zane.com/as/architect/project',
    'https://zane-portfolio.kiyo-n-zane.com/as/developer/project',
    'https://zane-portfolio.kiyo-n-zane.com/as/developer/blog',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const archProjects = (await ZaneArchProjects.getAll())

    return [
        ...(singlePages.map(p => ({
            url: p,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        })) as MetadataRoute.Sitemap),
        ...(archProjects.map((p) => ({
            url: `/as/architect/project/${p.title.replace(" ", "_")}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
        })) as MetadataRoute.Sitemap)
    ]
}