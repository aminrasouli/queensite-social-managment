import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './Header';
import Social from '../Social/Social';
import { useCustomThemeContext } from '../../theme/LocalThemeProvider';
import { FormControlLabel, Switch } from '@material-ui/core';
import { ThemeEnum } from '../../theme/theme.enum';

const useStyles = makeStyles((theme: Theme) => ({
    main: {
        marginTop: theme.spacing(5),
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        minWidth: '987px',
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column'
    }
}));

export default function Main(): JSX.Element {
    const classes = useStyles();
    const { currentTheme, setTheme } = useCustomThemeContext();
    const isDark: boolean = currentTheme === ThemeEnum.DARK;

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.checked ? ThemeEnum.DARK : ThemeEnum.LIGHT);
    };
    return (
        <Container className={classes.main} component="main">
            <CssBaseline />
            <div className={classes.content}>
                <Header title="حساب کاربری" showBreadcrumbs={true} />
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isDark}
                                onChange={handleThemeChange}
                                name="darkMode"
                                color="primary"
                            />
                        }
                        label="حالت تاریک"
                    />
                </div>
                <Social title="مسیرهای ارتباطی" />
            </div>
        </Container>
    );
}
