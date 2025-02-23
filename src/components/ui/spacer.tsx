import { styled } from '@pigment-css/react';
import { SpacingVairation } from '@pigment-css/react/theme';

const Spacer = styled("span")<{
    direction?: 'vertical' | 'horizontal',
    spacing: SpacingVairation
}>(({ theme }) => ({
    display: "block", userSelect: "none",
    width: ({ direction = 'horizontal', spacing }) => direction === 'vertical' ? theme.spacing[spacing] : undefined,
    height: ({ direction = 'horizontal', spacing }) => direction === 'horizontal' ? theme.spacing[spacing] : undefined,
}));

export default Spacer;