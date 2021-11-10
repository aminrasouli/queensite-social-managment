import React from 'react';
import Main from './Partial/Main';
import { CssBaseline } from '@material-ui/core';
import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import CustomThemeProvider from '../theme/LocalThemeProvider';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function App() {
    return (
        <StylesProvider jss={jss}>
            <CustomThemeProvider>
                <CssBaseline />
                <div className="App">
                    <Main />
                </div>
            </CustomThemeProvider>
        </StylesProvider>
    );
}

export default App;
