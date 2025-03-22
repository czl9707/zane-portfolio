import { styled } from '@pigment-css/react';
import * as React from 'react';

import CodePanelContainer from '@/components/ui/code/code-block.container';
import { codeToTokensWithThemes, type BundledLanguage, bundledLanguages } from '@/lib/utils/shiki.bundle';


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


const StyledCodeBlock = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
    async function StyleCodeBlock({ className, children, ...other }, ref) {
        const lang = className!.split(" ").filter(s => s.includes("language-"))[0].replace("language-", "");

        const shikiOut = await codeToTokensWithThemes(children as string,
            {
                lang: (Object.hasOwn(bundledLanguages, lang) ? lang : "none") as BundledLanguage,
                themes: {
                    light: "github-light-default",
                    dark: "github-dark-high-contrast",
                },
                colorReplacements: {

                }
            }
        );

        return (
            <CodePanelContainer copiableText={children as string}
                className={className} {...other} ref={ref}>
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
            </CodePanelContainer>
        )
    }
)


export default StyledCodeBlock;