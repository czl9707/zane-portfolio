import { generateOgImage } from "@/lib/utils/open-graph";
import { displayRole, type RoleType } from '@/lib/utils/constants';
import type { AstroSharedContext } from "astro";
import { getCollection, getEntry } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET(context:AstroSharedContext)
{
    const { idSlug: id, roleSlug: role } = context.params;

    const blogEntry = await getEntry("blog", `blog/by/${role}/${id}`)!;
    const backgroundImage = await fs.readFile(
        path.resolve(`./src/contents/${blogEntry.data.cover}`),
    );

    const jpeg = await generateOgImage({
            title: blogEntry.data.title,
            subTitle: `Blog by a ${displayRole(role as RoleType)}`,
            backgroundImage: "data:image/svg+xml;base64," + backgroundImage.toString('base64'),
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