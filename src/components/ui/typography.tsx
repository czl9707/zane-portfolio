import { CSSPropertiesWithCallback, styled } from "@pigment-css/react";
import { ThemeArgs, TypographyVairation } from "@pigment-css/react/theme";


function styledTypographyPropsFactory(
    typographyVariation: TypographyVairation
): ((themeArgs: ThemeArgs) => CSSPropertiesWithCallback<object>) {
    return ({ theme }: ThemeArgs) => ({
        margin: 0, padding: 0, whiteSpace: "nowrap", textWrap: "wrap",
        fontFamily: theme.typographies[typographyVariation].fontFamily,
        fontSize: theme.typographies[typographyVariation].fontSize,
        fontWeight: theme.typographies[typographyVariation].fontWeight,
        lineHeight: theme.typographies[typographyVariation].lineHeight,
    });
}

export const H1 = styled("h1")(styledTypographyPropsFactory("h1"));
export const H2 = styled("h2")(styledTypographyPropsFactory("h2"));
export const H3 = styled("h3")(styledTypographyPropsFactory("h3"));
export const H4 = styled("h4")(styledTypographyPropsFactory("h4"));
export const H5 = styled("h5")(styledTypographyPropsFactory("h5"));
export const H6 = styled("h6")(styledTypographyPropsFactory("h6"));
export const Body1 = styled("p")(styledTypographyPropsFactory("body1"));
export const Body2 = styled("p")(styledTypographyPropsFactory("body2"));
export const Button = styled("p")(styledTypographyPropsFactory("button"));
