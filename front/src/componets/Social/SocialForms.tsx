import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel,
    Select,
    TextField
} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { useFormik } from 'formik';
import { ItemType, ModifiedType } from './Social';
import { socials } from '../../include/data/socials';

const useStyles = makeStyles((theme: Theme) => ({
    main: {
        marginTop: theme.spacing(5),
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    typography: {
        fontFamily: `iranyekan, Arial, sans-serif`
    },
    content: {
        minWidth: '987px',
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    paper: {
        marginTop: theme.spacing(6),
        padding: theme.spacing(3),
        borderRadius: '9px'
    },
    socialIcon: {
        marginLeft: theme.spacing(-1),
        marginRight: theme.spacing(2)
    },
    socialText: {
        marginRight: theme.spacing(1)
    },
    socialListItem: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.info.main,
        borderRadius: '9px'
    },
    coloredLink: {
        color: theme.palette.primary.main
    },
    captionHeader: {
        marginBottom: theme.spacing(2),
        fontSize: 13
    },
    socialHeader: {
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2)
    },
    captionButton: {
        marginBottom: theme.spacing(2)
    },
    socialSection: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.info.main,
        borderRadius: '9px',
        boxShadow: 'none'
    },
    addSocialAction: {
        justifyContent: 'end'
    },
    socialLinkFormItem: {
        width: '100%'
    }
}));

export interface SocialFormsProps {
    editItem: any;
    onCancle: () => void;
    onSubmit: (item?: any) => void;
    modifiedType: ModifiedType;
}

const SocialForms: React.VFC<SocialFormsProps> = ({
    editItem,
    onCancle,
    onSubmit,
    modifiedType
}) => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            social: editItem?.social || '',
            username: editItem?.username || '',
            link: editItem?.link || ''
        },
        onSubmit: (values) => {
            const id = socials.find(
                (social) => social.name === values.social
            )?.id;
            onSubmit({
                id,
                social: values.social,
                username: values.username,
                link: values.link
            });
            formik.resetForm();
        }
    });

    return (
        <>
            <Card className={classes.socialSection}>
                <CardContent>
                    <Typography
                        className={classes.socialHeader}
                        variant="h5"
                        component="h2"
                    >
                        {modifiedType === ModifiedType.ADD
                            ? 'افزودن'
                            : 'ویرایش'}{' '}
                        مسیر ارتباطی{' '}
                        {
                            socials.find(
                                (social) => social.name === formik.values.social
                            )?.translate
                        }
                    </Typography>
                    <form
                        onSubmit={formik.handleSubmit}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    className={classes.socialLinkFormItem}
                                >
                                    <InputLabel
                                        htmlFor="filled-age-native-simple"
                                        required
                                    >
                                        نوع
                                    </InputLabel>
                                    <Select
                                        native
                                        id="social"
                                        name="social"
                                        value={formik.values.social}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.social &&
                                            Boolean(formik.errors.social)
                                        }
                                    >
                                        <option aria-label="None" value="" />
                                        {socials.map(
                                            ({ id, name, translate }) => (
                                                <option key={id} value={name}>
                                                    {translate}
                                                </option>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="لینک"
                                    id="link"
                                    name="link"
                                    dir="ltr"
                                    value={formik.values.link}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.link &&
                                        Boolean(formik.errors.link)
                                    }
                                    variant="outlined"
                                    className={classes.socialLinkFormItem}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="آی دی (ID)"
                                    id="username"
                                    name="username"
                                    dir="ltr"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.username &&
                                        Boolean(formik.errors.username)
                                    }
                                    variant="outlined"
                                    className={classes.socialLinkFormItem}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
                <CardActions className={classes.addSocialAction}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                            formik.resetForm();
                            onCancle();
                        }}
                    >
                        انصراف
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        disabled={
                            !formik.values.social ||
                            !formik.values.link ||
                            !formik.values.username
                        }
                        onClick={() => {
                            formik.handleSubmit();
                        }}
                    >
                        {modifiedType === ModifiedType.ADD ? 'ثبت' : 'ویرایش'}{' '}
                        مسیر ارتباطی{' '}
                        {
                            socials.find(
                                (social) => social.name === formik.values.social
                            )?.translate
                        }
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default SocialForms;
