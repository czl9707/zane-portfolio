import { styled } from "@pigment-css/react";
import * as Container from '@/components/ui/container';


const StickyHero = styled(Container.FullWidth)(({ theme }) => ({
    paddingTop: theme.size.header.height, paddingBottom: theme.spacing.paragraph,
    position: "sticky", top: 0, height: "100vh",
    display: "flex", flexDirection: "column", boxSizing: "border-box"
}));

export default StickyHero