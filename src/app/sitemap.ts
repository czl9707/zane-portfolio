import type { MetadataRoute } from 'next'
import * as ZaneArchProjects from '@/lib/cms/zane-arch-project'
import * as ZaneBlog from '@/lib/cms/zane-blog'
import * as ZaneNote from '@/lib/cms/zane-note'

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
    const archProjects = ZaneArchProjects.getAll();
    const blogs = ZaneBlog.getAll();
    const notes = ZaneNote.getAll();

    return [
        ...(singlePages.map(p => ({
            url: p,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        })) as MetadataRoute.Sitemap),
        ...((await archProjects).map((project) => ({
            url: `${ROOT}project/by/architect/${project.id}`,
            changeFrequency: 'monthly',
        })) as MetadataRoute.Sitemap),
        ...((await blogs).map((blog) => ({
            url: `${ROOT}blog/by/${blog.role}/${blog.id}`,
            changeFrequency: 'monthly',
        })) as MetadataRoute.Sitemap),
        ...((await notes).map((note) => ({
            url: `${ROOT}blog/by/${note.role}/${note.id}`,
            changeFrequency: 'monthly',
        })) as MetadataRoute.Sitemap)
    ]
}