import { createTheme, Theme, ThemeOptions } from '@material-ui/core';
import { ThemeEnum } from './theme.enum';

const commonOptions: ThemeOptions = {
    direction: 'rtl',
    palette: {
        background: {
            default: '#ffffff'
        },
        primary: {
            main: '#ffa82e'
        },
        secondary: {
            main: '#f64d4f'
        },
        info: {
            main: '#f4f6f8',
            dark: '#fff',
            contrastText: '#000'
        }
    },
    typography: {
        fontFamily: `"iranyekan", "Helvetica", "Arial", sans-serif`,
        fontSize: 12
    }
};

const lightTheme: Theme = createTheme({
    ...commonOptions,
    palette: {
        primary: {
            main: '#ffa82e'
        },
        secondary: {
            main: '#f64d4f'
        },
        info: {
            main: '#f4f6f8',
            dark: '#fff',
            contrastText: '#000'
        }
    }
});

const darkTheme = createTheme({
    ...commonOptions,
    palette: {
        type: 'dark',
        background: {
            default: '#161b25'
        },
        primary: {
            main: '#ffa82e'
        },
        info: {
            main: '#343d48',
            dark: '#212b35',
            contrastText: '#fff'
        }
    }
});

const getTheme = (theme: ThemeEnum): Theme => {
    return { ...(theme === ThemeEnum.LIGHT ? lightTheme : darkTheme) };
};

export default getTheme;
