import { styled } from '@pigment-css/react'
import StyledMarkdown from './styled-markdown.pipeline'

const DefaultMarkdown = styled(StyledMarkdown)(({ theme }) => ({
    display: "flex", flexDirection: "column", gap: theme.spacing.paragraph,
    "h1, h2, h3, h4, h5, h6": { marginTop: theme.spacing.paragraph }
}));


const HighLightMarkdown = styled(DefaultMarkdown)(({ theme }) => ({
    "*": { transition: `color ${theme.transition.short} linear` },
    'a': { color: `rgb(${theme.vars.color.default.foreground})` },
    "&:hover": {
        "span, li, p, h1, h2, h3, h4, h5, h6": {
            color: `rgb(${theme.vars.color.default.foreground} / 50%)`
        }
    }
}));


export {
    DefaultMarkdown as Default,
    HighLightMarkdown as LinkHighlight,
}