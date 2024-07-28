import { FC, useEffect, useState } from 'react';
import { Avatar, List, Toast, Typography } from '@douyinfe/semi-ui';

import { useData } from '@src/hooks/useData';

import { friendList } from '@src/utils/request';

import './index.scss';
import { FriendModel } from '@src/common/model';
import { motion } from 'framer-motion';

const { Text, Paragraph } = Typography;

const Index: FC = () => {
    const [friendActive, setFiendActive] = useState<FriendModel>();

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
    const handleFriendClick = (item: FriendModel) => {
        window.open(item.site, '_blank');
    };

    const avatarMotion = {
        open: {
            width: 0,
            height: 0,
            scale: 0,
        },
        closed: {
            scale: 1,
        },
    };

    const backgroundMotion = {
        open: {
            clipPath: `circle(320px at 310px 50px)`,
        },
        closed: {
            clipPath: `circle(0px at 310px 30px)`,
        },
    };

    const transition = { duration: 0.5, ease: 'easeInOut' };

    return (
        friends &&
        friends.length > 0 && (
            <List
                split={false}
                dataSource={friends}
                renderItem={(item) => (
                    <List.Item
                        style={{
                            position: 'relative',
                            padding: 0,
                            margin: '15px 0',
                            borderRadius: 10,
                            backgroundColor: ' rgb(var(--semi-grey-0))',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={() => setFiendActive(item)}
                        onMouseLeave={() => setFiendActive(undefined)}
                        onClick={() => handleFriendClick(item)}
                        main={
                            <div className="friend-list-item">
                                <div className="friend-list-item-content">
                                    <motion.div
                                        variants={avatarMotion}
                                        animate={
                                            item.friendId == friendActive?.friendId
                                                ? 'open'
                                                : 'closed'
                                        }
                                        transition={transition}
                                    >
                                        <Avatar
                                            size="default"
                                            style={{
                                                margin: 4,
                                                backgroundColor: 'rgba(var(--semi-violet-0))',
                                            }}
                                            src={item.avatar}
                                        />
                                    </motion.div>
                                    <motion.div>
                                        <Text strong>{item.nickname}</Text>
                                        <Paragraph ellipsis={{ rows: 2 }}>
                                            {item.description}
                                        </Paragraph>
                                    </motion.div>
                                </div>
                                <motion.div
                                    variants={backgroundMotion}
                                    animate={
                                        item.friendId == friendActive?.friendId ? 'open' : 'closed'
                                    }
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        top: 0,
                                        zIndex: 0,
                                        backgroundColor: 'var(--semi-color-primary)',
                                    }}
                                    transition={transition}
                                ></motion.div>
                            </div>
                        }
                    />
                )}
            />
        )
    );
};

export default Index;
