import React from 'react';
import { List } from '@material-ui/core';
import SocialListItem from './SocialListItem';
import { ItemType } from './Social';

export interface SocialListProps {
    list: ItemType[];
    onEdit: (item: ItemType) => void;
    onRemove: (item: ItemType) => void;
}

const SocialList: React.VFC<SocialListProps> = ({ list, onEdit, onRemove }) => {
    return (
        <>
            <List>
                {list?.map((item: ItemType) => (
                    <SocialListItem
                        key={item.id}
                        onEdit={onEdit}
                        onRemove={onRemove}
                        data={item}
                    />
                ))}
            </List>
        </>
    );
};

export default SocialList;
