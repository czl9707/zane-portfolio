import { styled } from "@pigment-css/react"

const Grid = styled("div")<{ columns: number }>(({ theme }) => ({
    [`@media(max-width: ${theme.breakpoint.lg})`]: {
        gridTemplateColumns: `repeat(1, minmax(0, 1fr))`
    },
    gridTemplateColumns: ({ columns }) => `repeat(${columns}, minmax(0, 1fr))`,
    display: "grid", gap: theme.spacing.paragraph, position: "relative",
}))

export default Grid;
