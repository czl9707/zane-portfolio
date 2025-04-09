import 'server-only';

import { type BundledLanguage, bundledLanguages, codeToTokensWithThemes } from "@/lib/utils/shiki.bundle";
import { styled } from "@pigment-css/react";

const Line = styled("span")({
    textWrap: "wrap", display: "block", whiteSpace: "pre",
    minHeight: "1.25rem"
});

const Token = styled("span")({
    display: "inline-block",
    "html.theme-dark &": {
        color: "var(--shiki-dark)",
        fontWeight: "var(--shiki-dark-font-weight)",
    },
    color: "var(--shiki-light)",
    fontWeight: "var(--shiki-light-font-weight)",
})

export default async function CodeHighLighter({ content, language }: {
    content: string,
    language: string
}) {
    const shikiOut = await codeToTokensWithThemes(content,
        {
            lang: (Object.hasOwn(bundledLanguages, language) ? language : "none") as BundledLanguage,
            themes: {
                light: "github-light-default",
                dark: "github-dark-high-contrast",
            },
            colorReplacements: {

            }
        }
    );

    return <>
        {
            shikiOut.map((line, i) => {
                if (i == shikiOut.length - 1 && line.length == 0) return undefined;
                return (<Line key={`line${i}`}>
                    {line.map((token, j) => (<Token key={`token${i} ${j}`}
                        style={{
                            "--shiki-light": token.variants.light.color,
                            "--shiki-dark": token.variants.dark.color,
                            fontStyle: token.variants.dark.fontStyle == 1 ? "italic" : "none",
                        } as React.CSSProperties}
                    >
                        {token.content}
                    </Token>))}
                </Line>)
            })
        }
    </>
}