import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { IconQuote, IconComment } from '@douyinfe/semi-icons';
import { Avatar, Tag, Tooltip, Typography } from '@douyinfe/semi-ui';

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
    commentType: CommentType;
    comment: CommentModel;
    childrens?: ReactNode;
    onCommentSubmit: (input: CommentEditRequest) => Promise<boolean>;
};

const { Text } = Typography;

const CommentItem: React.FC<ComProps> = ({ commentType, comment, childrens, onCommentSubmit }) => {
    const [isReply, setIsReply] = useState<boolean>(false);
    const [reply, setReply] = useState<CommentReply>();
    const [quoteContent, setQuoteContent] = useState<string>();
    const commentEditRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isReply) return;
        scrollToEdit();

        return () => {
            setIsReply(false);
        };
    }, [isReply]);

    // 滚动到输入框
    const scrollToEdit = () => {
        // 获取元素
        let editEle = commentEditRef?.current;
        // 滚动到输入框位置
        editEle?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    const handleReplyCommentClick = (comment: CommentModel) => {
        setIsReply((old) => !old);

        setQuoteContent('');
        setCommentReply(comment);
    };

    const handleQuoteCommentClick = (comment: CommentModel) => {
        setIsReply((old) => {
            if (old) scrollToEdit();
            return true;
        });

        setQuoteContent(comment.content);
        setCommentReply(comment);
    };

    const setCommentReply = (comment: CommentModel) => {
        setReply({
            parentId: comment.parentId,
            commentId: comment.commentId,
            floor: comment.floorString,
            content: comment.content,
        });
    };

    const handleCommentSubmit = async (input: CommentEditInput) => {
        // 获取父评论Id
        let parentId = reply && (reply.parentId || reply.commentId);
        // 获取回复评论Id
        let replyId = reply && reply.commentId;

        let edit = {
            parentId,
            replyId,
            content: input.content,
            commentType: commentType,
            belongId: comment.belongId,
        };

        var done = await onCommentSubmit(edit);
        if (done) setIsReply(false);

        return done;
    };

    return (
        <div key={comment.commentId} className="comment-item-wrap">
            <div className="comment-item-wrap-info">
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div className="comment-user">
                        <Avatar
                            style={{ margin: '0px 10px 0px 0px', flexShrink: 0 }}
                            size="small"
                            src={comment.visitor?.avatar}
                        />
                        <div className="comment-user-info">
                            <div className="comment-user-info-name">
                                <Text strong>{comment.floorString}</Text>
                                <Text className="text">{comment.visitor?.nickname || '未知'}</Text>
                            </div>
                            <div className="comment-user-info-date">
                                <Text>
                                    {format(new Date(comment.createTime), 'yyyy-MM-dd HH:mm')}
                                </Text>
                                <Tag
                                    size="large"
                                    style={{
                                        backgroundColor:
                                            'var(--semi-color-secondary-light-default)',
                                    }}
                                    className="diff"
                                >
                                    {dateDiff(new Date(comment.createTime))}
                                </Tag>
                            </div>
                        </div>
                    </div>
                    <div className="comment-func">
                        <Tooltip content="回复">
                            <IconComment onClick={() => handleReplyCommentClick(comment)} />
                        </Tooltip>
                        <Tooltip content="引用">
                            <IconQuote
                                className="comment-func-quote"
                                onClick={() => handleQuoteCommentClick(comment)}
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="comment-item-wrap-block">
                <div className="comment-item-wrap-block-reply">
                    {comment.reply && comment.reply.commentId != comment.parentId && (
                        <Text type="tertiary">
                            {`回复 ${comment.reply.floorString} ${
                                comment.reply?.nickname || '未知'
                            }`}
                        </Text>
                    )}
                </div>
                <div className="comment-item-wrap-block-content">
                    <MarkDown commentId={comment.commentId} content={comment.content} />
                </div>

                {isReply && (
                    <div
                        ref={commentEditRef}
                        style={{
                            backgroundColor: 'rgb(var(--semi-violet-0))',
                            padding: 5,
                        }}
                    >
                        <CommentEdit
                            isReply={true}
                            quote={quoteContent}
                            clearQuote={() => setQuoteContent(undefined)}
                            onSubmit={handleCommentSubmit}
                        />
                    </div>
                )}

                {childrens && <div className="comment-item-wrap-block-childs">{childrens}</div>}
            </div>
        </div>
    );
};

export default CommentItem;
