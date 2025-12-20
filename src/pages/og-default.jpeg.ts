import { generateOgImage } from "@/lib/utils/open-graph";
import { SITE_DESCRIPTION } from '@/lib/utils/constants';
import type { AstroSharedContext } from "astro";

export async function GET(context:AstroSharedContext)
{
    const jpeg = await generateOgImage({
            title: "Zane's Portfolio",
            subTitle: SITE_DESCRIPTION,
        },
        context
    );
    return new Response(jpeg, {
		headers: {
			"Content-Type": "image/jpeg",
		},
	});
}
