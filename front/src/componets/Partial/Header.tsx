import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from './Breadcrumbs';

type HeaderProps = {
    title: string;
    showBreadcrumbs: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
    headerText: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: theme.spacing(1)
    }
}));

const Header = ({ title, showBreadcrumbs = false }: HeaderProps) => {
    const classes = useStyles();
    return (
        <>
            <Typography
                className={classes.headerText}
                component="h6"
                variant="h6"
            >
                {title}
            </Typography>

            {showBreadcrumbs && <Breadcrumbs />}
        </>
    );
};

export default Header;
