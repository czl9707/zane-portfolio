type ThemeNode = {
    [key: string]: ThemeNode
} | string | number
type ThemeToken = {
    [key: string]: ThemeNode
}


interface ColorToken extends ThemeToken {
    background: string,
    foreground: string,
}
interface TypographyToken extends ThemeToken {
    fontFamily: string,
    fontSize: string,
    fontWeight: string,
    lineHeight: number,
}


interface Theme extends ThemeToken {
    color: {
        default: ColorToken,
        nebular: ColorToken,
        star: ColorToken,
        galaxy: ColorToken,
        solar: ColorToken,
    },
    breakpoint: {
        xs: string,
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
        code: TypographyToken,
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
        },
        sidePanel: {
            width: string,
        }
    },
}

type ColorVariation = keyof Theme["color"];
type TypographyVariation = keyof Theme["typographies"]
type SpacingVariation = keyof Theme["spacing"]

export type {
    ColorVariation, TypographyVariation, SpacingVariation
}


// vars generator
const theme: Theme = {
    color: {
        default: { background: "", foreground: "" },
        nebular: { background: "", foreground: "" },
        star: { background: "", foreground: "" },
        galaxy: { background: "", foreground: "" },
        solar: { background: "", foreground: "" },
    },
    breakpoint: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
    },
    typographies: {
        h1: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
        h2: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
        h3: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
        h4: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
        h5: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
        h6: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
        button: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
        body1: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
        body2: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
        code: { fontFamily: "", fontSize: "", fontWeight: "", lineHeight: 0 },
    },
    spacing: {
        block: "",
        group: "",
        component: "",
        paragraph: "",
    },
    transition: {
        short: "",
        long: "",
    },
    size: {
        header: {
            height: "",
        },
        border: {
            radius: "",
        },
        sidePanel: {
            width: "",
        }
    },
}

type VarNode<T> = T extends object ? { [K in keyof T]: VarNode<T[K]> } : string;

function objToVars<T extends ThemeNode>(obj: T, path: string[] = []): VarNode<T> {
    if (typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key, objToVars(value, [...path, key])
            ])
        ) as VarNode<T>;
    }
    else {
        return `var(--${[path.join("-")]})` as VarNode<T>;
    }
}

const themeVars = objToVars(theme);
export { themeVars };