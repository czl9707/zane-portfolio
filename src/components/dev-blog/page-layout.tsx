import * as Container from "@/components/ui/container";

import { styled } from "@pigment-css/react";

const ContentContainer = styled("div")({});
const CatagoryContainer = styled("div")({});

const ContentLayout = styled(Container.FullWidth)(({ theme }) => ({
    display: "grid", alignItems: "start", gap: theme.spacing.component,
    maxWidth: theme.breakpoint.lg, width: "100%",
    marginLeft: "auto", marginRight: "auto",
    boxSizing: "border-box",
    backgroundColor: `rgb(${theme.vars.color.default.background})`,

    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    [`@media(max-width: ${theme.breakpoint.md})`]: {
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    },
    [`${ContentContainer}`]: {
        gridColumn: "span 5 / span 5", position: 'relative'
    },
    [`${CatagoryContainer}`]: {
        gridColumn: "span 2 / span 2", position: "sticky",
        marginTop: theme.spacing.block,
        top: `calc(${theme.size.header.height} + ${theme.spacing.component})`,
        [`@media(max-width: ${theme.breakpoint.md})`]: {
            display: "none",
        },
    }
}));


export {
    ContentLayout as Layout,
    ContentContainer as Content,
    CatagoryContainer as Catagory,
}