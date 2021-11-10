import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Collapse, Paper } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SocialForms from './SocialForms';
import SocialList from './SocialList';
import SocialConfirmRemoveModal from './SocialConfirmRemoveModal';
import { API } from '../../include/api';
import { SocialApiAddOrUpdateType } from '../../include/api/social';

type HeaderProps = {
    title: string;
};

export interface ItemType {
    id: number;
    social: string;
    username: string;
    link: string;
}

export enum ModifiedType {
    ADD,
    EDIT,
    REMOVE
}

export interface SocialState {
    isOpen?: boolean;
    editId?: number | null;
    addId?: number | null;
    editItem?: ItemType | null;
    modifiedType: ModifiedType;
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        background: theme.palette.info.dark,
        marginTop: theme.spacing(6),
        padding: theme.spacing(3),
        borderRadius: '9px'
    },
    captionHeader: {
        marginBottom: theme.spacing(2),
        fontSize: 13
    },
    captionButton: {
        marginBottom: theme.spacing(2)
    }
}));

const Social = ({ title }: HeaderProps) => {
    const classes = useStyles();
    const [state, setState] = useState<SocialState>({
        editId: null,
        addId: null,
        isOpen: false,
        editItem: null,
        modifiedType: ModifiedType.ADD
    });
    const [list, setList] = useState<ItemType[]>([]);

    const fetchData = () => {
        API.Social.getSocials().then(({ data }) => {
            setList([
                ...data.map((item: SocialApiAddOrUpdateType) => ({
                    id: item.id,
                    link: item.social_link,
                    social: item.social,
                    username: item.social_id
                }))
            ]);
        });
    };

    const addOrUpdateData = async (
        modifiedType: ModifiedType,
        id: number,
        social: string,
        username: string,
        link: string
    ) => {
        if (
            modifiedType === ModifiedType.EDIT ||
            (modifiedType === ModifiedType.ADD &&
                list.find((item) => item.id === id))
        ) {
            API.Social.updateSocial({
                id,
                social,
                social_id: username,
                social_link: link
            })
                .then(async () => {
                    fetchData();
                    setState({
                        isOpen: false,
                        editItem: null,
                        modifiedType: ModifiedType.ADD
                    });
                })
                .catch((e) => console.warn(e));
        } else if (modifiedType === ModifiedType.ADD) {
            API.Social.addSocial({
                id,
                social,
                social_id: username,
                social_link: link
            })
                .then(async () => {
                    fetchData();
                    setState({
                        isOpen: false,
                        editItem: null,
                        modifiedType: ModifiedType.ADD
                    });
                })
                .catch((e) => console.warn(e));
        }
    };

    const removeData = async () => {
        API.Social.deleteSocial({
            id: state?.editItem?.id as number
        })
            .then(async () => {
                fetchData();
                setState({
                    modifiedType: ModifiedType.ADD
                });
            })
            .catch((e) => console.warn(e));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Paper className={classes.paper}>
                <Typography
                    className={classes.captionHeader}
                    variant="caption"
                    display="block"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Button
                    className={classes.captionButton}
                    color="primary"
                    size="small"
                    startIcon={
                        state.modifiedType === ModifiedType.EDIT ? (
                            <EditIcon />
                        ) : (
                            <AddIcon />
                        )
                    }
                    variant="text"
                    onClick={() =>
                        setState({
                            isOpen: !state.isOpen,
                            editId: null,
                            modifiedType: ModifiedType.ADD
                        })
                    }
                >
                    {state.modifiedType === ModifiedType.EDIT
                        ? 'ویرایش'
                        : 'افزودن'}{' '}
                    {title}
                </Button>
                <Collapse in={state.isOpen}>
                    <SocialForms
                        modifiedType={state.modifiedType}
                        key={state.editItem?.id}
                        editItem={state.editItem}
                        onCancle={() =>
                            setState({
                                isOpen: false,
                                editItem: null,
                                modifiedType: ModifiedType.ADD
                            })
                        }
                        onSubmit={async (item: ItemType) => {
                            await addOrUpdateData(
                                state.modifiedType,
                                item.id,
                                item.social,
                                item.username,
                                item.link
                            );
                        }}
                    />
                </Collapse>
                <SocialList
                    list={list}
                    onEdit={(item: ItemType) =>
                        setState({
                            editItem: item,
                            isOpen: true,
                            modifiedType: ModifiedType.EDIT
                        })
                    }
                    onRemove={(item: ItemType) => {
                        setState({
                            isOpen: false,
                            editItem: item,
                            modifiedType: ModifiedType.REMOVE
                        });
                    }}
                />
            </Paper>
            <SocialConfirmRemoveModal
                modifiedType={state.modifiedType}
                item={state?.editItem}
                onAccept={removeData}
                onCancel={() => {
                    setState({
                        modifiedType: ModifiedType.ADD
                    });
                }}
            />
        </>
    );
};

export default Social;
