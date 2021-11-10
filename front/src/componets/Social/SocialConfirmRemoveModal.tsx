import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Fade, Modal, TextField } from '@material-ui/core';
import { ItemType, ModifiedType } from './Social';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme: Theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(5),
        margin: 0
    },
    modalPaper: {
        background: theme.palette.info.dark,
        padding: theme.spacing(5),
        borderRadius: '9px'
    },
    modalAction: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    },
    modalInput: {
        width: '100%'
    },
    modelActionButton: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1)
    }
}));

type Nullable<T> = T | null;
type Undefinable<T> = T | undefined;

export interface SocialConfirmRemoveModalProps {
    modifiedType: ModifiedType;
    item: Nullable<Undefinable<ItemType>>;
    onAccept: (item?: Nullable<Undefinable<ItemType>>) => void;
    onCancel: (item?: Nullable<Undefinable<ItemType>>) => void;
}

const SocialConfirmRemoveModal = ({
    item,
    modifiedType,
    onCancel,
    onAccept
}: SocialConfirmRemoveModalProps) => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            confirmation: ''
        },
        onSubmit: ({ confirmation }) => {
            if (confirmation === 'تایید') {
                onAccept(item);
                formik.resetForm();
            }
        }
    });
    return (
        <>
            <Modal
                className={classes.modal}
                open={modifiedType === ModifiedType.REMOVE}
                onClose={() => onCancel()}
                closeAfterTransition
            >
                <Fade in={modifiedType === ModifiedType.REMOVE}>
                    <div className={classes.modalPaper}>
                        <h2 id="transition-modal-title">
                            آیا از تصمیم خود مطمئن هستید؟
                        </h2>
                        <p id="transition-modal-description">
                            برای حذف مسیر ارتباطی{' '}
                            <span dir="ltr">{item?.username}</span> لطفا تایید
                            را بنویسید
                        </p>
                        <form noValidate autoComplete="off">
                            <TextField
                                className={classes.modalInput}
                                label="تایید"
                                id="confirmation"
                                name="confirmation"
                                value={formik.values.confirmation}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.confirmation &&
                                    Boolean(formik.errors.confirmation)
                                }
                                variant="outlined"
                                required
                            />
                        </form>
                        <div className={classes.modalAction}>
                            <Button
                                className={classes.modelActionButton}
                                size="small"
                                variant="outlined"
                                onClick={() => onCancel()}
                            >
                                انصراف
                            </Button>
                            <Button
                                className={classes.modelActionButton}
                                variant="contained"
                                size="small"
                                disabled={
                                    !formik.values.confirmation ||
                                    formik.values.confirmation !== 'تایید'
                                }
                                color="primary"
                                onClick={() => {
                                    formik.handleSubmit();
                                }}
                            >
                                حذف
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default SocialConfirmRemoveModal;
