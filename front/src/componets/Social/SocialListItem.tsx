import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Button,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { SvgIconComponent } from '@material-ui/icons';
import { socials } from '../../include/data/socials';
import { ItemType } from './Social';

const useStyles = makeStyles((theme: Theme) => ({
    socialIcon: {
        marginRight: theme.spacing(1)
    },
    socialText: {
        marginRight: theme.spacing(1)
    },
    socialListItem: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.info.main,
        borderRadius: '9px'
    },
    coloredLink: {
        color: theme.palette.primary.main
    },
    socialIconColor: {
        color: theme.palette.info.contrastText
    }
}));

export interface SocialListItemProps {
    data: ItemType;
    onEdit: (item: ItemType) => void;
    onRemove: (item: ItemType) => void;
}

const SocialListItem: React.VFC<SocialListItemProps> = ({
    data,
    onEdit,
    onRemove
}) => {
    const { username, link, social } = data;
    const classes = useStyles();
    const Icon = socials?.find(({ name }) => name === social)
        ?.icon as SvgIconComponent;
    return (
        <ListItem className={classes.socialListItem}>
            <ListItemIcon style={{ minWidth: '35px' }}>
                <Icon className={classes.socialIconColor} />
            </ListItemIcon>
            <ListItemText style={{ display: 'flex' }}>
                <Typography className={classes.socialIcon} component="span">
                    {social}
                </Typography>
                <Typography
                    className={classes.socialText}
                    variant="caption"
                    component="span"
                >
                    آی دی(ID):
                </Typography>
                <Typography
                    className={classes.socialText}
                    component="span"
                    dir={'ltr'}
                >
                    {username}
                </Typography>
                <Typography
                    className={classes.socialText}
                    variant="caption"
                    component="span"
                >
                    لینک:
                </Typography>
                <Link
                    href={link}
                    color="inherit"
                    dir={'ltr'}
                    className={classes.coloredLink}
                >
                    {link}
                </Link>
            </ListItemText>
            <ListItemSecondaryAction>
                <Button
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(data)}
                >
                    ویرایش
                </Button>
                <Button
                    color="secondary"
                    onClick={() => onRemove(data)}
                    startIcon={<DeleteIcon />}
                >
                    حذف
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default SocialListItem;
