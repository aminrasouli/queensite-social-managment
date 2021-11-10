import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Link from '@material-ui/core/Link';
import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    breadcrumbs: {
        fontSize: '13px'
    }
}));

const Breadcrumbs = () => {
    const classes = useStyles();
    return (
        <MuiBreadcrumbs
            aria-label="breadcrumb"
            className={classes.breadcrumbs}
            separator={<FiberManualRecordIcon style={{ fontSize: '5px' }} />}
        >
            <Link color="inherit" href="/">
                خانه
            </Link>
            <Link color="inherit" href="/">
                کاربر
            </Link>
            <Link color="textPrimary" href="/" aria-current="page">
                تنظیمات کاربری
            </Link>
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;
