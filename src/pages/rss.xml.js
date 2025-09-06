import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/utils/constants';

export async function GET(context) {
	const posts = await getCollection('blog');
	const notes = await getCollection('note');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: [
			...posts.map((post) => {
				const link = "/" + post.filePath.split("/").slice(-4).join("/").replace(".md", "")
				return {
					title: post.data.title,
					description: post.data.description,
					lastUpdateDate: post.data["last-updated-date"],
					createdDate: post.data["created-date"],
					tags: post.data.tags,
					link: link,
				}
			}),
			...notes.map((note) => {
				const link = "/" + note.filePath.split("/").slice(-4).join("/").replace(".md", "")
				return {
					title: note.data.title,
					lastUpdateDate: note.data["last-updated-date"],
					createdDate: note.data["created-date"],
					tags: note.data.tags,
					link: link,
				}
			}),
		],
	});
}
