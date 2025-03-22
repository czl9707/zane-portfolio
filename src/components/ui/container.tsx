import { styled } from "@pigment-css/react";

const FullWidthContainer = styled("div")(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoint.xs})`]: {
        padding: `0 ${theme.spacing.group}`,
    },
    padding: `0 calc(${theme.spacing.group} / 2)`,
    position: "relative", overflowX: "visible", width: "100%", boxSizing: "border-box",
}))

export {
    FullWidthContainer as FullWidth,
};