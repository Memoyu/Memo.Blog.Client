import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unshiftMomentComment } from '@redux/slices/moment/momentCommentSlice';

import './index.scss';
import { Space, TagGroup, Toast, Typography } from '@douyinfe/semi-ui';
import { IconComment, IconLikeHeart } from '@douyinfe/semi-icons';
import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';
import { CommentType, MomentModel } from '@src/common/model';
import CommentEdit, { CommentInputInfo } from '@src/components/comment-edit';
import { commentCreate } from '@src/utils/request';

interface ComProps {
    moment: MomentModel;
}

const { Text } = Typography;

const Index: FC<ComProps> = ({ moment }) => {
    const dispatch = useDispatch();

    const [isReply, setIsReply] = useState<boolean>(false);

    const handleAddCommentClick = (input: CommentInputInfo) => {
        commentCreate({
            nickname: input.nickname,
            content: input.content,
            commentType: CommentType.Moment,
            belongId: moment.momentId,
            email: input.email,
            avatar: input.avatar,
            avatarOrigin: input.avatarOrigin,
            avatarOriginType: input.avatarOriginType,
        }).then((res) => {
            if (!res.isSuccess || !res.data) {
                Toast.error(res.message);
                return;
            }
            setIsReply(false);
            dispatch(unshiftMomentComment(res.data));
        });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Space spacing="tight">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <IconLikeHeart /> <Text style={{ marginLeft: 3 }}>{123}</Text>
                        </div>
                        <div
                            style={{
                                marginLeft: 15,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => setIsReply(!isReply)}
                        >
                            <IconComment />
                            <Text style={{ marginLeft: 3 }}>{123}</Text>
                        </div>
                    </div>
                </Space>
                <TagGroup
                    maxTagCount={4}
                    tagList={moment.tags.map((t, idx) => {
                        return {
                            tagKey: idx,
                            color: 'purple',
                            children: t,
                        } as TagProps;
                    })}
                    size="large"
                    showPopover
                />
            </div>
            {isReply && (
                <div
                    style={{
                        backgroundColor: 'rgb(var(--semi-violet-0))',
                        marginBottom: 5,
                        padding: 10,
                    }}
                >
                    <CommentEdit rows={4} onSubmit={handleAddCommentClick} />
                </div>
            )}
        </div>
    );
};

export default Index;
