import satori, { type Font, type FontStyle, type FontWeight } from "satori"
import * as react from "react";
import sharp from "sharp";
import { getFontData } from "astro:assets";
import type { AstroSharedContext } from "astro";

const fontCache: Font[] = [];
async function getCustomFonts(
    context: AstroSharedContext
): Promise<Font[]> {
    if (fontCache.length > 0) {
        return fontCache;
    }
    
    const fontData = getFontData("--font-mono");
    for (const weight of ([400, 500, 600, 700] as FontWeight[]))
    {
        for (const style of (["normal", "italic"] as FontStyle[]) )
        {
            const fontSrc = fontData.find(d => d.weight === weight.toString() && d.style === style)!
                .src.find(s => s.format == "woff")!;
            const fontDataRaw = await fetch(new URL(fontSrc.url, context.url.origin)).then(res => res.arrayBuffer())

            fontCache.push({
                name: "Red Hat Mono",
                data: fontDataRaw,
                weight: weight,
                style: style,
            });
        }
    }

    return fontCache;
};

export async function generateOgImage(
    {title, subTitle}: {title: string, subTitle: string},
    context: AstroSharedContext
): Promise<ArrayBuffer> {
    const content = (
        <div style={{ 
            background: "black", color:'white', fontFamily: "Red Hat Mono",
            width: 1200, height: 630, paddingLeft: 96, paddingRight: 96, overflow: "hidden",
            display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center",
        }}>
            <p style={{ 
                fontSize: 420, fontWeight: 700, width: 1200, textAlign:"center", position: "absolute", opacity:0.15, lineHeight: 0,
                top: 120
            }}>ZANE</p>
            <p style={{ 
                fontSize: 420, fontWeight: 700, width: 1200, textAlign:"center", position: "absolute", opacity:0.15, lineHeight: 0,
                bottom: - 120 - 60
            }}>CHEN</p>

            <h1 style={{ fontSize: 60, fontWeight: 700 }}>{title}</h1>
            {subTitle && <p style={{ fontSize: "28px", opacity: 0.75, fontWeight: 500 }}>{subTitle}</p>}
        </div>
    );
    
    
    const svg = await satori(content, {
		width: 1200,
		height: 630,
		debug: false,
		fonts: await getCustomFonts(context),
	});

	const jpeg = await sharp(Buffer.from(svg))
		.jpeg({quality: 60, })
		.toBuffer();

	return jpeg.buffer as ArrayBuffer;
}