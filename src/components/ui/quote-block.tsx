import { styled } from "@pigment-css/react";

const QuoteBlock = styled("blockquote")(({ theme }) => ({
    borderLeft: `4px solid rgb(${theme.vars.color.default.foreground} / 0.25)`,
    paddingLeft: theme.spacing.component,
    paddingTop: theme.spacing.paragraph, paddingBottom: theme.spacing.paragraph,
    fontStyle: "italic",
}));

export default QuoteBlock;