import { generateOgImage } from "@/lib/utils/open-graph";
import { displayRole, type RoleType } from '@/lib/utils/constants';
import type { AstroSharedContext } from "astro";
import { getCollection, getEntry } from "astro:content";

export async function GET(context:AstroSharedContext)
{
    const { idSlug: id, roleSlug: role } = context.params;

    const noteEntry = await getEntry("note", `note/by/${role}/${id}`)!;
    const jpeg = await generateOgImage({
            title: noteEntry.data.title,
            subTitle: `Note by a ${displayRole(role as RoleType)}`,
        },
    );

    return new Response(jpeg, {
        headers: {
            "Content-Type": "image/jpeg",
        },
    });
}

export async function getStaticPaths() {
    const notes = await getCollection("note");

    return notes.map((note) => {
        const role = note.id.split("/").at(-2)
        const id = note.id.split("/").at(-1);
        return {
            params: { idSlug: id, roleSlug: role },
        };
    });
}