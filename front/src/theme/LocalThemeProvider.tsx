import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import getTheme from './theme';
import { ThemeEnum } from './theme.enum';

interface CustomThemeProviderType {
    currentTheme: ThemeEnum;
    setTheme: (theme: ThemeEnum) => void;
}

export const CustomThemeContext = React.createContext<CustomThemeProviderType>({
    currentTheme: ThemeEnum.DARK,
    setTheme: (theme: ThemeEnum) => {}
});

const CustomThemeProvider: React.FC = ({ children }) => {
    const [themeName, setThemeName] = useState<ThemeEnum>(ThemeEnum.DARK);
    const contextValue = {
        currentTheme: themeName,
        setTheme: setThemeName
    };
    return (
        <CustomThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={getTheme(themeName)}>
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export const useCustomThemeContext = (): CustomThemeProviderType =>
    React.useContext(CustomThemeContext);
export default CustomThemeProvider;
