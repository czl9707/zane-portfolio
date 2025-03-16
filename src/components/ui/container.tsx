import { styled } from "@pigment-css/react";

const FullWidthContainer = styled("div")(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoint.sm})`]: {
        paddingLeft: theme.spacing.group, paddingRight: theme.spacing.group,
    },
    paddingLeft: theme.spacing.component, paddingRight: theme.spacing.component,
    position: "relative", overflowX: "visible", width: "100%", boxSizing: "border-box",
}))

export {
    FullWidthContainer as FullWidth,
};