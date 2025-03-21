import { styled } from '@pigment-css/react';
import { SpacingVairation } from '@pigment-css/react/theme';

const Spacer = styled("span")<{
    direction?: 'vertical' | 'horizontal',
    spacing?: SpacingVairation
}>(({ theme }) => ({
    display: "block", userSelect: "none",
    width: ({ direction = 'horizontal', spacing = "group" }) => direction === 'vertical' ? theme.vars.spacing[spacing] : undefined,
    height: ({ direction = 'horizontal', spacing = "group" }) => direction === 'horizontal' ? theme.vars.spacing[spacing] : undefined,
}));

export default Spacer;