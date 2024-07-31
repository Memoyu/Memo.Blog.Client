import { FC, useEffect, useState } from 'react';
import { Space, TagGroup, Typography } from '@douyinfe/semi-ui';
import { IconComment, IconLikeHeart } from '@douyinfe/semi-icons';

import CommentList from '@src/components/comment-list';

import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';
import { CommentType, MomentModel } from '@src/common/model';

import './index.scss';

interface ComProps {
    moment: MomentModel;
}

const { Text } = Typography;

const Index: FC<ComProps> = ({ moment }) => {
    const [comments, setComments] = useState(0);
    const [showComment, setShowComment] = useState(false);

    useEffect(() => {
        setComments(moment.comments);
    }, [moment]);

    // 展开评论
    const handleExpandCommentClick = (_moment: MomentModel) => {
        setShowComment((old) => !old);
    };

    // 增加评论数
    const incrementCommentTotal = (num: number) => {
        setComments((old) => old + num);
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
                        >
                            <IconLikeHeart /> <Text style={{ marginLeft: 3 }}>{moment.likes}</Text>
                        </div>
                        {moment.commentable && (
                            <div
                                style={{
                                    marginLeft: 15,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={() => handleExpandCommentClick(moment)}
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
