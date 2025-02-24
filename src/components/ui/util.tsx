import { css } from "@pigment-css/react";

export const solidBackground = css(({ theme }) => ({ background: `rgb(${theme.vars.color.default.background})` }));
export const paddingTopGroup = css(({ theme }) => ({ paddingTop: theme.spacing.group }));
export const paddingBottomGroup = css(({ theme }) => ({ paddingBottom: theme.spacing.group }));
export const marginTopGroup = css(({ theme }) => ({ marginTop: theme.spacing.group }));
export const marginBottomGroup = css(({ theme }) => ({ marginBottom: theme.spacing.group }));

