import React, { ReactNode, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IconQuote, IconComment } from '@douyinfe/semi-icons';
import { Avatar, Space, Tag, Toast, Tooltip, Typography } from '@douyinfe/semi-ui';

import { useDispatch } from 'react-redux';

import CommentEdit, { CommentEditInput } from '@components/comment-edit';
import MarkDown from '@components/markdown/comment';

import { dateDiff } from '@utils/date';

import { commentCreate } from '@src/utils/request';
import { CommentModel, CommentType } from '@src/common/model';
import { pushMomentComment } from '@redux/slices/moment/momentCommentSlice';
import { increaseMomentComments } from '@redux/slices/moment/momentSlice';

import './index.scss';

interface CommentReply {
    belongId?: string;
    parentId?: string;
    commentId?: string;
    floor?: string;
    replyTo: string;
    content: string;
}

type ComProps = {
    comment: CommentModel;
    childrens?: ReactNode;
};

const { Text } = Typography;

const CommentItem: React.FC<ComProps> = ({ comment, childrens }) => {
    const dispatch = useDispatch();

    const [isReply, setIsReply] = useState<boolean>(false);
    const [reply, setReply] = useState<CommentReply>();
    const [quote, setQuote] = useState<CommentModel>();

    useEffect(() => {}, [comment]);

    const handleCommentReply = (comment: CommentModel) => {
        setReply({
            parentId: comment.parentId,
            commentId: comment.commentId,
            floor: comment.floorString,
            replyTo: comment.visitor.nickname,
            content: comment.content,
        });
    };

    const handleCommentSubmit = async (input: CommentEditInput) => {
        // 获取父评论Id
        let parentId = reply && (reply.parentId || reply.commentId);
        // 获取回复评论Id
        let replyId = reply && reply.commentId;

        let res = await commentCreate({
            parentId,
            replyId,
            content: input.content,
            commentType: CommentType.Moment,
            belongId: comment.belongId,
        });

        if (!res.isSuccess || !res.data) {
            Toast.error(res.message);
            return false;
        }
        setIsReply(false);

        dispatch(pushMomentComment(res.data));
        dispatch(increaseMomentComments({ momentId: comment.belongId, count: 1 }));

        return true;
    };

    return (
        <div key={comment.commentId} className="moment-comment-item">
            {/* flexShrink: 0 解决flex下头像变形问题 */}
            <Avatar
                style={{ margin: '0 10px', flexShrink: 0 }}
                size="small"
                src={comment.visitor.avatar}
            />
            <div className="moment-comment-item-box">
                <div className="moment-comment-item-box-info">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Space spacing="tight" style={{ display: 'flex', alignItems: 'baseline' }}>
                            {/* <Text strong>{comment.floorString}</Text> */}
                            <Text className="name">{comment.visitor.nickname}</Text>
                            <Text>{format(new Date(comment.createTime), 'yyyy-MM-dd HH:mm')}</Text>
                            <Tag size="large" color="violet">
                                {dateDiff(new Date(comment.createTime))}
                            </Tag>
                        </Space>

                        <div>
                            <Tooltip content="回复">
                                <IconComment
                                    style={{ marginLeft: 20, cursor: 'pointer' }}
                                    onClick={() => {
                                        setQuote(undefined);
                                        handleCommentReply(comment);
                                        setIsReply(!isReply);
                                    }}
                                />
                            </Tooltip>
                            <Tooltip content="引用">
                                <IconQuote
                                    style={{ marginLeft: 10, cursor: 'pointer' }}
                                    onClick={() => {
                                        setQuote(comment);
                                        handleCommentReply(comment);
                                        if (!isReply) {
                                            setIsReply(true);
                                        }
                                    }}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="moment-comment-item-box-reply">
                    {comment.reply && (
                        <Text type="tertiary">{`回复 ${comment.reply.nickname}`}</Text> //${comment.reply.floorString}
                    )}
                </div>
                <div className="moment-comment-item-box-content">
                    <MarkDown content={comment.content} />
                </div>

                {isReply && (
                    <div
                        style={{
                            backgroundColor: 'rgb(var(--semi-violet-0))',
                            marginBottom: 5,
                            padding: 10,
                        }}
                    >
                        <CommentEdit
                            quote={quote?.content}
                            rows={4}
                            onSubmit={handleCommentSubmit}
                        />
                    </div>
                )}

                {childrens && <div className="moment-comment-item-box-childs">{childrens}</div>}
            </div>
        </div>
    );
};

export default CommentItem;
