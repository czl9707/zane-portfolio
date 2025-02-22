import { styled } from '@pigment-css/react';

const Divider = styled("span")(({ theme }) => ({
    display: "block", width: "100%", borderTop: `1px solid rgb(${theme.vars.color.default.foreground} / 0.5)`,
}))

export default Divider;