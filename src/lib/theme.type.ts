import type { ExtendTheme } from '@pigment-css/react/theme';

declare module '@pigment-css/react/theme' {
    interface ColorToken {
        background: string,
        foreground: string,
    }
    interface TypographyToken {
        fontFamily: string,
        fontSize: string,
        fontWeight: string,
        lineHeight: number,
    }

    interface ThemeToken {
        color: {
            default: ColorToken,
            nebular: ColorToken,
            star: ColorToken,
            galaxy: ColorToken,
            solar: ColorToken,
            shade: ColorToken,
        },
        breakpoint: {
            sm: string,
            md: string,
            lg: string,
        },
        typographies: {
            h1: TypographyToken,
            h2: TypographyToken,
            h3: TypographyToken,
            h4: TypographyToken,
            h5: TypographyToken,
            h6: TypographyToken,
            button: TypographyToken,
            body1: TypographyToken,
            body2: TypographyToken,
        },
        spacing: {
            block: string,
            group: string,
            component: string,
            paragraph: string,
        },
        transition: {
            short: string,
            long: string,
        },
        size: {
            header: {
                height: string,
            },
            border: {
                radius: string,
            }
        },
    }

    type ColorVariation = keyof ThemeToken["color"];
    type TypographyVairation = keyof ThemeToken["typographies"]

    interface ThemeArgs {
        theme: ExtendTheme<{
            colorScheme: 'light' | 'dark';
            tokens: ThemeToken;
        }>;
    }
}


