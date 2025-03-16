import * as Container from "@/components/ui/container";

import { styled } from "@pigment-css/react";

const ContentContainer = styled("div")({});
const CatagoryContainer = styled("div")({});

const ContentLayout = styled(Container.FullWidth)(({ theme }) => ({
    display: "flex", flexDirection: "row", alignItems: "start", gap: theme.spacing.component,
    maxWidth: theme.breakpoint.lg, width: "100%",
    marginLeft: "auto", marginRight: "auto",
    boxSizing: "border-box",

    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    [`@media(max-width: ${theme.breakpoint.lg})`]: {
        gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    },
    [`${ContentContainer}`]: {
        flex: "5 5", position: 'relative'
    },
    [`${CatagoryContainer}`]: {
        flex: "2 2", position: "sticky",
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