import { styled } from "@pigment-css/react";

const BriefsContainer = styled("div")(({ theme }) => ({
    display: "flex", flexDirection: "column", gap: theme.spacing.group
}));

export default BriefsContainer