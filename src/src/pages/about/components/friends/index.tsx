import { FC, useEffect, useState } from 'react';
import { Avatar, AvatarGroup, Card, Popover, Toast, Typography } from '@douyinfe/semi-ui';

import { useData } from '@src/hooks/useData';

import { friendList } from '@src/utils/request';

import './index.scss';
import { FriendModel } from '@src/common/model';

const { Text } = Typography;
const { Meta } = Card;

const Index: FC = () => {
    const [showDesc, setShowDesc] = useState(false);
    const [avatarActive, setAvatarActive] = useState<FriendModel>();

    const [friends, _loading, setFriends, _setLoading] = useData<Array<FriendModel>>([]);

    // 获取关于我
    let getFriends = async () => {
        let res = await friendList();
        if (!res.isSuccess || !res.data) {
            Toast.error(res.message);
            return;
        }

        let friends = res.data;
        setFriends(friends);
    };

    useEffect(() => {
        getFriends();
    }, []);
    const handleFriendAvatarClick = (index: number) => {
        let f = friends[index];

        setAvatarActive(f);
    };
    return (
        friends &&
        friends.length > 0 && (
            <div className="friend-list">
                <Text strong className="friend-list-title">
                    友链：
                </Text>
                <AvatarGroup>
                    {friends.map((f, index) => {
                        return (
                            <Avatar
                                style={{
                                    display: avatarActive?.friendId == f.friendId ? '' : 'none',
                                    backgroundColor: 'var(--semi-color-primary)',
                                }}
                                src={f.avatar}
                                alt={f.nickname}
                                onClick={() => handleFriendAvatarClick(index)}
                            >
                                {f.avatar && f.avatar.length > 1 ? '' : f.nickname.substring(0, 1)}
                            </Avatar>
                        );
                    })}
                </AvatarGroup>
                <div style={{ display: showDesc ? '' : 'none' }}>这是描述</div>
            </div>
        )
    );
};

export default Index;
