import 'server-only';

import { type BundledLanguage, bundledLanguages, codeToTokensWithThemes } from "@/lib/utils/shiki.bundle";
import style from "./code-highlighter.module.css";

export default async function CodeHighLighter({ content, language }: {
    content: string,
    language: string
}) {
    const shikiOut = await codeToTokensWithThemes(content,
        {
            lang: (Object.hasOwn(bundledLanguages, language) ? language : "text") as BundledLanguage,
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
                return (<span className={style.Line} key={`line${i}`}>
                    {line.map((token, j) => (<span className={style.Token} key={`token${i} ${j}`}
                        style={{
                            "--shiki-light": token.variants.light.color,
                            "--shiki-dark": token.variants.dark.color,
                            fontst: token.variants.dark.fontStyle == 1 ? "italic" : undefined,
                        } as React.CSSProperties}
                    >
                        {token.content}
                    </span>))}
                </span>)
            })
        }
    </>
}