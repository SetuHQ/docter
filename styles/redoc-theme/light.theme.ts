import { darken, lighten, readableColor, transparentize } from 'polished';

const setuColours = {
    deepPurple   : '#20014b',
    flashTurk    : '#42cacd',
    crackedYolk  : '#feab3e',
    salmonRouge  : '#fe90a0',
    fadedMing    : '#8db1d1',
    thunderCloud : '#b7cde1',
    pearlyCoke   : '#f4f7fa',
    murkyNight   : '#091016'
};

// @ts-ignore
// @ts-ignore
const defaultTheme: ThemeInterface = {
    spacing: {
        unit: 5,
        sectionHorizontal: ({ spacing }) => spacing.unit * 8,
        sectionVertical: ({ spacing }) => spacing.unit * 8,
    },

    breakpoints: {
        small  : '50rem',
        medium : '85rem',
        large  : '105rem',
    },

    colors: {
        tonalOffset: 0.3,
        primary: {
            main: setuColours.murkyNight,
            light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
            dark: setuColours.murkyNight,
            contrastText: setuColours.salmonRouge,
        },
        success: {
            main: '#0ec05c',
            light: ({ colors }) => lighten(colors.tonalOffset, colors.success.main),
            dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
            contrastText: ({ colors }) => readableColor(colors.success.main),
        },
        warning: {
            main: '#d4ad03',
            light: ({ colors }) => lighten(colors.tonalOffset, colors.warning.main),
            dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
            contrastText: '#ffffff',
        },
        error: {
            main: '#ed4545',
            light: ({ colors }) => lighten(colors.tonalOffset, colors.error.main),
            dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
            contrastText: ({ colors }) => readableColor(colors.error.main),
        },
        text: {
            primary: setuColours.deepPurple,
            secondary: ({ colors }) => lighten(colors.tonalOffset, colors.text.primary),
        },
        border: {
            dark: 'rgba(0,0,0, 0.1)',
            light: setuColours.thunderCloud,
        },
        responses: {
            success: {
                color: ({ colors }) => colors.success.main,
                backgroundColor: ({ colors }) => transparentize(0.9, colors.success.main),
            },
            error: {
                color: ({ colors }) => colors.error.main,
                backgroundColor: ({ colors }) => transparentize(0.9, colors.error.main),
            },
            redirect: {
                color: '#ffa500',
                backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
            },
            info: {
                color: '#87ceeb',
                backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
            },
        },
        http: {
            get     : setuColours.flashTurk,
            post    : '#0ec05c',
            put     : '#9b708b',
            options : '#d3ca12',
            patch   : '#e09d43',
            delete  : '#ed4545',
            basic   : '#999',
            link    : '#31bbb6',
            head    : '#c167e4',
        },
    },
    schema: {
        linesColor: setuColours.thunderCloud,
        defaultDetailsWidth: '75%',
        typeNameColor: theme => theme.colors.text.secondary,
        typeTitleColor: theme => theme.schema.typeNameColor,
        requireLabelColor: theme => theme.colors.error.main,
        labelsTextSize: '0.9em',
        nestingSpacing: '1em',
        nestedBackground: '#fff',
        arrow: {
            size: '1.1em',
            color: setuColours.fadedMing,
        },
    },
    typography: {
        fontSize: '14px',
        lineHeight: '1.5em',
        fontWeightRegular: '400',
        fontWeightBold: '600',
        fontWeightLight: '300',
        fontFamily: 'Matter, sans-serif',
        smoothing: 'antialiased',
        optimizeSpeed: true,
        headings: {
            fontFamily: 'Matter, sans-serif',
            fontWeight: '600',
            fontSize: '14px',
        },
        code: {
            fontSize: '12px',
            fontFamily: 'GT America Mono, monospace',
            lineHeight: ({ typography }) => typography.lineHeight,
            fontWeight: ({ typography }) => typography.fontWeightRegular,
            color: setuColours.deepPurple,
            backgroundColor: '#e8f8f9',
            wrap: false,
        },
        links: {
            color: ({ colors }) => colors.primary.main,
            visited: ({ typography }) => typography.links.color,
            hover: ({ typography }) => lighten(0.2, typography.links.color),
        },
    },
    sidebar: {
        width: '260px',
        backgroundColor: '#fff',
        boxShadow : '2px 0 2px -2px rgba(0, 0, 0, 0.24)',
        textColor: setuColours.murkyNight,
        groupItems: {
            textTransform: 'uppercase',
        },
        level1Items: {
            textTransform: 'none',
        },
        arrow: {
            size: '1.5em',
            color: setuColours.fadedMing,
        },
    },
    logo: {
        maxHeight: ({ sidebar }) => sidebar.width,
        maxWidth: ({ sidebar }) => sidebar.width,
    },
    rightPanel: {
        backgroundColor: setuColours.pearlyCoke,
        width: '44%',
        textColor: setuColours.murkyNight,
    },
    codeBlock: {
        backgroundColor: ({ rightPanel }) => darken(0.05, rightPanel.backgroundColor),
    }
};

export default defaultTheme;

export function resolveTheme(theme: ThemeInterface): ResolvedThemeInterface {
    const resolvedValues: any = {};
    let counter = 0;
    const setProxy = (obj: any, path: string) => {
        Object.keys(obj).forEach(k => {
            const currentPath = (path ? path + '.' : '') + k;
            const val = obj[k];
            if (typeof val === 'function') {
                Object.defineProperty(obj, k, {
                    get() {
                        if (!resolvedValues[currentPath]) {
                            counter++;
                            if (counter > 1000) {
                                throw new Error(
                                    `Theme probably contains cirucal dependency at ${currentPath}: ${val.toString()}`,
                                );
                            }

                            resolvedValues[currentPath] = val(theme);
                        }
                        return resolvedValues[currentPath];
                    },
                    enumerable: true,
                });
            } else if (typeof val === 'object') {
                setProxy(val, currentPath);
            }
        });
    };

    setProxy(theme, '');
    return JSON.parse(JSON.stringify(theme));
}

export interface ColorSetting {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
}

export interface HTTPResponseColors {
    color: string;
    backgroundColor: string;
}

export interface FontSettings {
    fontSize: string;
    fontWeight: string;
    fontFamily: string;
    lineHeight: string;
    color: string;
}

export interface ResolvedThemeInterface {
    spacing: {
        unit: number;
        sectionHorizontal: number;
        sectionVertical: number;
    };
    breakpoints: {
        small: string;
        medium: string;
        large: string;
    };
    colors: {
        tonalOffset: number;
        primary: ColorSetting;
        success: ColorSetting;
        warning: ColorSetting;
        error: ColorSetting;
        border: {
            light: string;
            dark: string;
        };
        text: {
            primary: string;
            secondary: string;
        };
        responses: {
            success: HTTPResponseColors;
            error: HTTPResponseColors;
            redirect: HTTPResponseColors;
            info: HTTPResponseColors;
        };
        http: {
            get: string;
            post: string;
            put: string;
            options: string;
            patch: string;
            delete: string;
            basic: string;
            link: string;
            head: string;
        };
    };
    schema: {
        linesColor: string;
        defaultDetailsWidth: string;
        typeNameColor: string;
        typeTitleColor: string;
        requireLabelColor: string;
        labelsTextSize: string;
        nestingSpacing: string;
        nestedBackground: string;
        arrow: {
            size: string;
            color: string;
        };
    };
    typography: {
        fontSize: string;
        lineHeight: string;
        fontWeightLight: string;
        fontWeightRegular: string;
        fontWeightBold: string;
        fontFamily: string;

        smoothing: string;
        optimizeSpeed: boolean;

        code: FontSettings & {
            backgroundColor: string;
            wrap: boolean;
        };
        headings: {
            fontFamily: string;
            fontWeight: string;
            fontSize:string;
        };

        links: {
            color: string;
            visited: string;
            hover: string;
        };
    };
    sidebar: {
        width: string;
        boxShadow: string;
        backgroundColor : string;
        textColor: string;
        groupItems: {
            textTransform: string;
        };
        level1Items: {
            textTransform: string;
        };
        arrow: {
            size: string;
            color: string;
        };
    };
    logo: {
        maxHeight: string;
        maxWidth: string;
    };
    rightPanel: {
        backgroundColor: string;
        textColor: string;
        width: string;
    };
    codeBlock: {
        backgroundColor: string;
    };

    extensionsHook?: (name: string, props: any) => string;
}

export type primitive = string | number | boolean | undefined | null;
export type AdvancedThemeDeep<T> = T extends primitive
    ? T | ((theme: ResolvedThemeInterface) => T)
    : AdvancedThemeObject<T>;
export type AdvancedThemeObject<T> = { [P in keyof T]?: AdvancedThemeDeep<T[P]> };
export type ThemeInterface = AdvancedThemeObject<ResolvedThemeInterface>;