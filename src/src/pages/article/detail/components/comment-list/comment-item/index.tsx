import React, { ReactNode, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IconQuote, IconComment } from '@douyinfe/semi-icons';
import { Avatar, Space, Tag, Tooltip, Typography } from '@douyinfe/semi-ui';

import CommentEdit, { CommentEditInput } from '@components/comment-edit';
import MarkDown from '@components/markdown/comment';

import { dateDiff } from '@utils/date';

import { CommentEditRequest, CommentModel, CommentType } from '@src/common/model';

import './index.scss';

interface CommentReply {
    belongId?: string;
    parentId?: string;
    commentId?: string;
    floor?: string;
    content: string;
}

type ComProps = {
    comment: CommentModel;
    childrens?: ReactNode;
    onCommentSubmit: (input: CommentEditRequest) => Promise<boolean>;
};

const { Text } = Typography;

const CommentItem: React.FC<ComProps> = ({ comment, childrens, onCommentSubmit }) => {
    const [isReply, setIsReply] = useState<boolean>(false);
    const [reply, setReply] = useState<CommentReply>();
    const [quote, setQuote] = useState<CommentModel>();

    useEffect(() => {
        return () => {
            setIsReply(false);
        };
    }, [comment]);

    const handleCommentReply = (comment: CommentModel) => {
        setReply({
            parentId: comment.parentId,
            commentId: comment.commentId,
            floor: comment.floorString,
            content: comment.content,
        });
    };

    const handleCommentSubmit = (input: CommentEditInput) => {
        // 获取父评论Id
        let parentId = reply && (reply.parentId || reply.commentId);
        // 获取回复评论Id
        let replyId = reply && reply.commentId;

        let edit = {
            parentId,
            replyId,
            content: input.content,
            commentType: CommentType.Article,
            belongId: comment.belongId,
        };

        return onCommentSubmit(edit);
    };

    return (
        <div key={comment.commentId} className="moment-comment-item">
            {/* flexShrink: 0 解决flex下头像变形问题 */}
            <Avatar
                style={{ margin: '0px 10px 0px 0px', flexShrink: 0 }}
                size="small"
                src={comment.visitor?.avatar}
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
                        <div className="comment-info">
                            <div className="comment-info-user">
                                <Text strong>{comment.floorString}</Text>
                                <Text className="comment-info-user-name">
                                    {comment.visitor?.nickname || '未知'}
                                </Text>
                            </div>
                            <div className="comment-info-date">
                                <Text>
                                    {format(new Date(comment.createTime), 'yyyy-MM-dd HH:mm')}
                                </Text>
                                <Tag size="large" color="violet" className="comment-info-date-diff">
                                    {dateDiff(new Date(comment.createTime))}
                                </Tag>
                            </div>
                        </div>
                        <div className="comment-func">
                            <Tooltip content="回复">
                                <IconComment
                                    onClick={() => {
                                        setQuote(undefined);
                                        handleCommentReply(comment);
                                        setIsReply(!isReply);
                                    }}
                                />
                            </Tooltip>
                            <Tooltip content="引用">
                                <IconQuote
                                    className="comment-func-quote"
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
                    {comment.reply && comment.reply.commentId != comment.parentId && (
                        <Text type="tertiary">
                            {`回复 ${comment.reply.floorString} ${
                                comment.reply?.nickname || '未知'
                            }`}
                        </Text>
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
