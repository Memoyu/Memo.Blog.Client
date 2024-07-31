import { FC, useEffect, useState } from 'react';
import { Space, TagGroup, Toast, Typography } from '@douyinfe/semi-ui';
import { IconComment, IconLikeHeart } from '@douyinfe/semi-icons';

import CommentList from '@src/components/comment-list';

import { useMoment } from '@src/stores';

import { momentLike } from '@src/utils/request';

import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';
import { CommentType, MomentModel } from '@src/common/model';

import './index.scss';

interface ComProps {
    moment: MomentModel;
}

const { Text } = Typography;

const Index: FC<ComProps> = ({ moment }) => {
    const setMomentLike = useMoment((state) => state.setMomentLike);

    const [comments, setComments] = useState(0);
    const [likes, setLikes] = useState(0);
    const [showComment, setShowComment] = useState(false);

    useEffect(() => {
        setComments(moment.comments);
        setLikes(moment.likes);
    }, [moment]);

    // 展开评论
    const handleExpandCommentClick = () => {
        setShowComment((old) => !old);
    };

    // 点赞
    const handleLikeClick = (m: MomentModel) => {
        if (moment.isLike) return;
        momentLike(m.momentId).then((res) => {
            if (!res.isSuccess) {
                Toast.error(res.message);
                return;
            }
            incrementLikeTotal(1);
            setMomentLike(m.momentId);
        });
    };

    // 增加评论数
    const incrementCommentTotal = (num: number) => {
        setComments((old) => old + num);
    };

    // 增加点赞数
    const incrementLikeTotal = (num: number) => {
        setLikes((old) => old + num);
    };

    return (
        <div className="moment-item-extra">
            <div className="moment-item-extra-top">
                <Space spacing="tight">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => handleLikeClick(moment)}
                        >
                            <IconLikeHeart
                                style={{
                                    color: moment.isLike ? 'rgba(var(--semi-red-6), 1)' : '',
                                }}
                            />
                            <Text style={{ marginLeft: 3 }}>{likes}</Text>
                        </div>
                        {moment.commentable && (
                            <div
                                style={{
                                    marginLeft: 15,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={() => handleExpandCommentClick()}
                            >
                                <IconComment />
                                <Text style={{ marginLeft: 3 }}>{comments}</Text>
                            </div>
                        )}
                    </div>
                </Space>
                <TagGroup
                    maxTagCount={3}
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
            {showComment && (
                <div className="moment-item-extra-comment">
                    <CommentList
                        belongId={moment.momentId}
                        commentType={CommentType.Moment}
                        incrementTotal={incrementCommentTotal}
                    />
                </div>
            )}
        </div>
    );
};

export default Index;
