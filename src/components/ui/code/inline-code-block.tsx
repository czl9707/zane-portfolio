import { styled } from '@pigment-css/react';

const InlineCodeBlock = styled("code")(({ theme }) => ({
    backgroundColor: `rgb(${theme.vars.color.default.foreground} / 15%)`,
    borderRadius: theme.size.border.radius, paddingLeft: '.5rem', paddingRight: ".5rem"
}))

export default InlineCodeBlock;