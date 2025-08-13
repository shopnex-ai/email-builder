import { alpha, createTheme, darken, lighten } from "@mui/material/styles";

const BRAND_NAVY = "#212443";
const BRAND_BLUE = "#1687b9";
const BRAND_GREEN = "#1F8466";
const BRAND_RED = "#E81212";
const BRAND_YELLOW = "#F6DC9F";
const BRAND_PURPLE = "#6C0E7C";
const BRAND_BROWN = "#CC996C";
const STANDARD_FONT_FAMILY =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
const MONOSPACE_FONT_FAMILY =
    'ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace';

const getBaseTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode,
            background: {
                default: mode === "dark" ? "#121212" : "#f2f5f7",
                paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
            },
            text: {
                primary: mode === "dark" ? "#ffffff" : "#1F1F21",
                secondary: mode === "dark" ? "#b3b3b3" : "#4F4F4F",
            },
        },
        typography: {
            fontFamily: STANDARD_FONT_FAMILY,
        },
    });

const getThemeConfig = (baseTheme: any) =>
    createTheme(baseTheme, {
        palette: {
            brand: {
                navy: BRAND_NAVY,
                blue: BRAND_BLUE,
                red: BRAND_RED,
                green: BRAND_GREEN,
                yellow: BRAND_YELLOW,
                purple: BRAND_PURPLE,
                brown: BRAND_BROWN,
            },
            success: {
                main: BRAND_GREEN,
                light: lighten(BRAND_GREEN, 0.15),
                dark: darken(BRAND_GREEN, 0.15),
            },
            error: {
                main: BRAND_RED,
                light: lighten(BRAND_RED, 0.15),
                dark: darken(BRAND_RED, 0.15),
            },
            cadet: {
                100: baseTheme.palette.mode === "dark" ? "#2A2A2A" : "#F9FAFB",
                200: baseTheme.palette.mode === "dark" ? "#333333" : "#F2F5F7",
                300: baseTheme.palette.mode === "dark" ? "#3F3F3F" : "#DCE4EA",
                400: baseTheme.palette.mode === "dark" ? "#666666" : "#A8BBCA",
                500: baseTheme.palette.mode === "dark" ? "#8A8A8A" : "#6A8BA4",
            },
            highlight: {
                100:
                    baseTheme.palette.mode === "dark"
                        ? alpha(BRAND_YELLOW, 0.1)
                        : lighten(BRAND_YELLOW, 0.8),
                200:
                    baseTheme.palette.mode === "dark"
                        ? alpha(BRAND_YELLOW, 0.2)
                        : lighten(BRAND_YELLOW, 0.6),
                300:
                    baseTheme.palette.mode === "dark"
                        ? alpha(BRAND_YELLOW, 0.3)
                        : lighten(BRAND_YELLOW, 0.4),
                400:
                    baseTheme.palette.mode === "dark"
                        ? alpha(BRAND_YELLOW, 0.4)
                        : lighten(BRAND_YELLOW, 0.2),
                500: BRAND_YELLOW,
            },
            info: {
                main: BRAND_BLUE,
            },
            primary: {
                main: BRAND_BLUE,
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: `
        address {
          font-style: normal;
        }
        fieldset {
          border: none;
          padding: 0;
        }
        pre {
          font-family: ${MONOSPACE_FONT_FAMILY}
          white-space: pre-wrap;
          font-size: 12px;
        }
      `,
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        fontSize: baseTheme.typography.pxToRem(14),
                    },
                    action: {
                        paddingTop: 0,
                        marginRight: 0,
                    },
                    filledSuccess: {
                        backgroundColor: BRAND_GREEN,
                    },
                },
            },
            MuiStepLabel: {
                styleOverrides: {
                    label: {
                        fontWeight: baseTheme.typography.fontWeightMedium,
                    },
                },
            },
            MuiDialog: {
                defaultProps: {
                    fullWidth: true,
                },
            },
            MuiDialogContent: {
                styleOverrides: {
                    root: {
                        paddingTop: baseTheme.spacing(1),
                        paddingBottom: baseTheme.spacing(2),
                    },
                },
            },
            MuiDialogTitle: {
                defaultProps: {
                    variant: "h4",
                },
                styleOverrides: {
                    root: {
                        paddingTop: baseTheme.spacing(3),
                        paddingBottom: baseTheme.spacing(1),
                    },
                },
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        borderTop: "1px solid",
                        borderTopColor: baseTheme.palette.divider,
                        marginTop: baseTheme.spacing(2.5),
                        padding: `${baseTheme.spacing(1.5)} ${baseTheme.spacing(3)}`,
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        ...baseTheme.typography.body2,
                        borderColor:
                            baseTheme.palette.mode === "dark"
                                ? baseTheme.palette.grey[700]
                                : baseTheme.palette.grey[200],
                    },
                    head: {
                        ...baseTheme.typography.overline,
                        fontWeight: baseTheme.typography.fontWeightMedium,
                        letterSpacing: "0.075em",
                        color: baseTheme.palette.text.secondary,
                    },
                },
            },
            MuiTableRow: {
                styleOverrides: {
                    root: {
                        "&:last-child td": {
                            borderBottom: 0,
                        },
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        textTransform: "uppercase",
                        fontSize: baseTheme.typography.pxToRem(14),
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        "&.MuiChip-filledError, &.MuiChip-filledSuccess": {
                            fill: baseTheme.palette.primary.contrastText,
                        },
                    },
                    sizeSmall: {
                        borderRadius: baseTheme.spacing(0.5),
                        fontSize: 12,
                    },
                    iconSmall: {
                        fontSize: 14,
                        marginLeft: baseTheme.spacing(1),
                    },
                    colorSecondary: {
                        borderColor: baseTheme.palette.grey[400],
                        color: baseTheme.palette.text.secondary,
                    },
                    label: {
                        fontWeight: baseTheme.typography.fontWeightMedium,
                    },
                },
            },
            MuiDrawer: {
                defaultProps: {
                    PaperProps: {
                        elevation: 2,
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        fontSize: baseTheme.typography.pxToRem(12),
                        backgroundColor:
                            baseTheme.palette.mode === "dark"
                                ? "#333333"
                                : "rgba(97, 97, 97, 0.9)",
                        color:
                            baseTheme.palette.mode === "dark"
                                ? "#ffffff"
                                : "#ffffff",
                    },
                },
            },
            MuiSlider: {
                styleOverrides: {
                    root: {
                        height: 1,
                    },
                    track: {
                        height: 1,
                        border: "none",
                    },
                    rail: {
                        height: 1,
                        backgroundColor: baseTheme.palette.grey[500],
                    },
                    mark: {
                        backgroundColor: baseTheme.palette.grey[500],
                    },
                    markActive: {
                        height: 0,
                    },
                    thumb: {
                        height: 16,
                        width: 16,
                        cursor: "col-resize",
                        "&:hover, &.Mui-active, &.Mui-focusVisible": {
                            boxShadow: `0 0 0 4px ${alpha(BRAND_BLUE, 0.2)}`,
                        },
                        "&:before": {
                            display: "none",
                        },
                    },
                },
            },
            MuiPaper: {
                defaultProps: {
                    elevation: 2,
                    square: true,
                },
            },
            MuiButtonBase: {
                defaultProps: {
                    disableTouchRipple: true,
                    focusRipple: true,
                },
                styleOverrides: {
                    root: {
                        "&.MuiButton-containedSecondary.Mui-disabled": {
                            backgroundColor: baseTheme.palette.grey[100],
                        },
                    },
                },
            },
            MuiButtonGroup: {
                defaultProps: {
                    disableElevation: true,
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    edgeStart: {
                        marginLeft: baseTheme.spacing(-1),
                    },
                    colorSecondary: {
                        color: baseTheme.palette.grey[500],
                    },
                },
            },
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    textPrimary: {
                        color: baseTheme.palette.text.primary,
                    },
                    textSecondary: {
                        color: baseTheme.palette.text.secondary,
                    },
                    outlinedPrimary: {
                        borderColor:
                            baseTheme.palette.grey[
                                baseTheme.palette.mode === "dark" ? 600 : 300
                            ],
                        color: baseTheme.palette.text.primary,
                        "&:hover, &:active, &:focus": {
                            borderColor:
                                baseTheme.palette.grey[
                                    baseTheme.palette.mode === "dark"
                                        ? 400
                                        : 500
                                ],
                            color: baseTheme.palette.text.primary,
                        },
                    },
                    containedSecondary: {
                        backgroundColor: baseTheme.palette.background.paper,
                        border: `1px solid ${baseTheme.palette.grey[baseTheme.palette.mode === "dark" ? 600 : 300]}`,
                        color: baseTheme.palette.text.primary,
                        "&:hover, &:active, &:focus": {
                            backgroundColor: baseTheme.palette.background.paper,
                            borderColor:
                                baseTheme.palette.grey[
                                    baseTheme.palette.mode === "dark"
                                        ? 400
                                        : 500
                                ],
                            color: baseTheme.palette.text.primary,
                        },
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        paddingLeft: baseTheme.spacing(1.5),
                        paddingRight: baseTheme.spacing(1.5),
                    },
                },
            },
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        "&:not(.Mui-disabled, .Mui-error):before": {
                            borderBottom: `1px solid ${baseTheme.palette.grey[400]}`,
                        },
                        "&:hover:not(.Mui-disabled, .Mui-error):before": {
                            borderBottom: `1px solid ${baseTheme.palette.grey[500]} !important`,
                        },
                        "&:after": {
                            borderBottom: `1px solid ${baseTheme.palette.text.primary} !important`,
                        },
                        "&.MuiOutlinedInput-root:not(.Mui-error)": {
                            "& fieldset": {
                                borderColor:
                                    baseTheme.palette.grey[
                                        baseTheme.palette.mode === "dark"
                                            ? 600
                                            : 300
                                    ],
                                transition: "border-color 0.2s",
                            },
                        },
                        "&.MuiOutlinedInput-root:not(.Mui-disabled, .Mui-error)":
                            {
                                "&:hover fieldset": {
                                    borderColor:
                                        baseTheme.palette.grey[
                                            baseTheme.palette.mode === "dark"
                                                ? 500
                                                : 400
                                        ],
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor:
                                        baseTheme.palette.text.secondary,
                                    borderWidth: 1,
                                },
                            },
                    },
                    input: {
                        fontSize: baseTheme.typography.pxToRem(14),
                        "&.Mui-disabled": {
                            WebkitTextFillColor: "inherit",
                            color: baseTheme.palette.text.secondary,
                        },
                    },
                    inputSizeSmall: {},
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        "& legend": {
                            fontSize: "0.85em",
                            maxWidth: "100%",
                        },
                    },
                },
            },
            MuiInputAdornment: {
                styleOverrides: {
                    root: {
                        "& .MuiTypography-root": {
                            fontSize: baseTheme.typography.pxToRem(14),
                            color: baseTheme.palette.text.secondary,
                        },
                    },
                },
            },
            MuiInputLabel: {
                defaultProps: {
                    shrink: true,
                },
                styleOverrides: {
                    shrink: {
                        transform: "scale(0.85)",
                        fontWeight: baseTheme.typography.fontWeightMedium,
                        "&.Mui-focused": {
                            color: baseTheme.palette.text.primary,
                        },
                        "&.MuiInputLabel-standard": {
                            transform: "translate(0, -4px) scale(0.85)",
                            color: "#4F4F4F",
                        },
                        "&.MuiInputLabel-outlined": {
                            transform: "translate(15px, -8px) scale(0.85)",
                        },
                    },
                },
            },
            MuiTabs: {
                defaultProps: {
                    variant: "scrollable",
                },
                styleOverrides: {
                    indicator: {
                        height: 1,
                        backgroundColor: baseTheme.palette.text.primary,
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        minWidth: baseTheme.spacing(2),
                        paddingLeft: baseTheme.spacing(1.5),
                        paddingRight: baseTheme.spacing(1.5),
                        fontSize: baseTheme.typography.pxToRem(14),
                        fontFamily: baseTheme.typography.fontFamily,
                        lineHeight: 1.5,
                        fontWeight: baseTheme.typography.fontWeightMedium,
                        transition: "color 0.2s",
                        "&.Mui-selected": {
                            color: baseTheme.palette.text.primary,
                        },
                        "&:hover": {
                            color: baseTheme.palette.text.primary,
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 0,
                    },
                },
            },
            MuiCardHeader: {
                styleOverrides: {
                    title: {
                        fontSize: baseTheme.typography.pxToRem(18),
                        fontWeight: baseTheme.typography.fontWeightMedium,
                    },
                },
            },
        },
        typography: {
            fontFamily: baseTheme.typography.fontFamily,
            h1: {
                fontFamily: baseTheme.typography.fontFamily,
                fontSize: baseTheme.typography.pxToRem(40),
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                fontWeight: baseTheme.typography.fontWeightMedium,
            },
            h2: {
                fontFamily: baseTheme.typography.fontFamily,
                fontSize: baseTheme.typography.pxToRem(32),
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                fontWeight: baseTheme.typography.fontWeightMedium,
            },
            h3: {
                fontFamily: baseTheme.typography.fontFamily,
                fontSize: baseTheme.typography.pxToRem(24),
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                fontWeight: baseTheme.typography.fontWeightMedium,
            },
            h4: {
                fontFamily: baseTheme.typography.fontFamily,
                fontSize: baseTheme.typography.pxToRem(20),
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                fontWeight: baseTheme.typography.fontWeightMedium,
            },
            h5: {
                fontFamily: baseTheme.typography.fontFamily,
                fontSize: baseTheme.typography.pxToRem(18),
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
                fontWeight: baseTheme.typography.fontWeightMedium,
            },
            h6: {
                fontFamily: baseTheme.typography.fontFamily,
                fontSize: baseTheme.typography.pxToRem(16),
                lineHeight: 1.5,
                letterSpacing: "-0.005em",
                fontWeight: baseTheme.typography.fontWeightMedium,
            },
            body1: {
                fontSize: baseTheme.typography.pxToRem(14),
            },
            body2: {
                fontSize: baseTheme.typography.pxToRem(12),
            },
            overline: {
                fontWeight: baseTheme.typography.fontWeightMedium,
                letterSpacing: "0.05em",
            },
            button: {
                textTransform: "none",
                fontWeight: baseTheme.typography.fontWeightMedium,
                lineHeight: 1.5,
            },
            caption: {
                letterSpacing: 0,
                lineHeight: 1.5,
            },
        },
        shadows: [
            "none",
            "0px 4px 15px rgba(33, 36, 67, 0.04), 0px 0px 2px rgba(33, 36, 67, 0.04), 0px 0px 1px rgba(33, 36, 67, 0.04)",
            "0px 10px 20px rgba(33, 36, 67, 0.04), 0px 2px 6px rgba(33, 36, 67, 0.04), 0px 0px 1px rgba(33, 36, 67, 0.04)",
            "0px 16px 24px rgba(33, 36, 67, 0.05), 0px 2px 6px rgba(33, 36, 67, 0.05), 0px 0px 1px rgba(33, 36, 67, 0.05)",
            "0px 24px 32px rgba(33, 36, 67, 0.06), 0px 16px 24px rgba(33, 36, 67, 0.06), 0px 4px 8px rgba(33, 36, 67, 0.06)",
            ...Array(20).fill("none"),
        ],
    });

export const getTheme = (mode: "light" | "dark" = "light") => {
    const baseTheme = getBaseTheme(mode);
    return getThemeConfig(baseTheme);
};

const THEME = getTheme("light");
export default THEME;
