import { styled } from "@pigment-css/react"

const Grid = styled("div")<{ columns: number }>(({ theme }) => ({
    [`@media(max-width: ${theme.breakpoint.md})`]: {
        gridTemplateColumns: `repeat(1, minmax(0, 1fr))`
    },
    gridTemplateColumns: ({ columns }) => `repeat(${columns}, minmax(0, 1fr))`,
    display: "grid", columnGap: theme.spacing.paragraph, rowGap: theme.spacing.component,
    position: "relative",
}))

export default Grid;
