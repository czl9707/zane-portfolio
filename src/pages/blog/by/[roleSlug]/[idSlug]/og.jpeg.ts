import { generateOgImage } from "@/lib/utils/open-graph";
import { displayRole, type RoleType } from '@/lib/utils/constants';
import type { AstroSharedContext } from "astro";
import { getCollection, getEntry } from "astro:content";

export async function GET(context:AstroSharedContext)
{
    const { idSlug: id, roleSlug: role } = context.params;

    const blogEntry = await getEntry("blog", `blog/by/${role}/${id}`)!;
    const jpeg = await generateOgImage({
            title: blogEntry.data.title,
            subTitle: `Blog by a ${displayRole(role as RoleType)}`,
        },
    );

    return new Response(jpeg, {
        headers: {
            "Content-Type": "image/jpeg",
        },
    });
}

export async function getStaticPaths() {
    const blogs = await getCollection("blog");

    return blogs.map((blog) => {
        const role = blog.id.split("/").at(-2)
        const id = blog.id.split("/").at(-1);
        return {
            params: { idSlug: id, roleSlug: role },
        };
    });
}