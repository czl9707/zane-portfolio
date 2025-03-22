import { styled } from '@pigment-css/react';
import * as React from 'react';
import { BundledLanguage, createHighlighter } from 'shiki'

import CodePanelContainer from '@/components/ui/code-panel-container';

const supportedLangs = ["python", "typescript", "shell"];

const highlighter = await createHighlighter({
    langs: supportedLangs,
    themes: ["github-light-default", "github-dark-high-contrast"]
});

const InlineCodeBlock = styled("code")(({ theme }) => ({
    backgroundColor: `rgb(${theme.vars.color.default.foreground} / 15%)`,
    borderRadius: theme.size.border.radius, paddingLeft: '.5rem', paddingRight: ".5rem"
}))

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
    function StyleCodeBlock({ className, children, ...other }, ref) {
        const lang = className!.split(" ").filter(s => s.includes("language-"))[0].replace("language-", "");

        const shikiOut = highlighter.codeToTokensWithThemes(children as string,
            {
                lang: (supportedLangs.includes(lang) ? lang : "none") as BundledLanguage,
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

const CodeBlock = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
    function StyleCodeBlock({ className, ...other }, ref) {
        let Comp;
        if (className?.includes("language-")) {
            Comp = StyledCodeBlock;
        }
        else {
            Comp = InlineCodeBlock;
        }
        return <Comp className={className} {...other} ref={ref} />
    }
)


export default CodeBlock;