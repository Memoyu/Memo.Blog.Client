import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unshiftMomentComment } from '@redux/slices/moment/momentCommentSlice';
import { increaseMomentComments } from '@redux/slices/moment/momentSlice';

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
            visitorId: input.visitorId,
            content: input.content,
            commentType: CommentType.Moment,
            belongId: moment.momentId,
        }).then((res) => {
            if (!res.isSuccess || !res.data) {
                Toast.error(res.message);
                return;
            }
            setIsReply(false);
            dispatch(unshiftMomentComment(res.data));
            dispatch(increaseMomentComments({ momentId: moment.momentId, count: 1 }));
        });
    };
    const handleReplyMomentClick = (moment: MomentModel) => {
        if (!moment.commentable) {
            Toast.warning('这条动态不让评论哦！');
            return;
        }

        setIsReply(!isReply);
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
                            <IconLikeHeart /> <Text style={{ marginLeft: 3 }}>{moment.likes}</Text>
                        </div>
                        <div
                            style={{
                                marginLeft: 15,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => handleReplyMomentClick(moment)}
                        >
                            <IconComment />
                            <Text style={{ marginLeft: 3 }}>{moment.comments}</Text>
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
