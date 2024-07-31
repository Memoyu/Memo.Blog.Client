import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { IconQuote, IconComment } from '@douyinfe/semi-icons';
import { Avatar, Tag, Tooltip, Typography } from '@douyinfe/semi-ui';

import CommentEdit, { CommentEditInput } from '@components/comment-edit';
import MarkDown from '@components/markdown/comment';

import { dateDiff } from '@utils/date';

import { CommentEditRequest, CommentModel, CommentType } from '@src/common/model';

import './index.scss';

const commentEditEleId = 'comment-edit-';

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
    const [quote, setQuote] = useState<CommentModel>();
    const commentEditRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return () => {
            setIsReply(false);
        };
    }, [comment]);

    useEffect(() => {
        if (!isReply) return;
        scrollToEdit();
    }, [isReply, quote]);

    // 滚动到输入框
    const scrollToEdit = () => {
        // 获取元素
        let editEle = commentEditRef?.current;
        // console.log('编辑元素', eleId, editEle, commentEditRef);
        // 滚动到输入框位置
        console.log('gao', editEle?.offsetTop, editEle?.clientHeight);
        window.scrollTo({
            top: editEle ? editEle.offsetTop + editEle.clientHeight : 0,
            behavior: 'smooth',
        });
    };

    const getOffsetTop = (element: any) => {
        let actualTop = element.offsetTop;
        let current = element.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;

            current = current.offsetParent;
        }
        return actualTop;
    };

    const handleCommentReply = (comment: CommentModel) => {
        setReply({
            parentId: comment.parentId,
            commentId: comment.commentId,
            floor: comment.floorString,
            content: comment.content,
        });

        // setTimeout(() => {}, 100);
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
            commentType: commentType,
            belongId: comment.belongId,
        };

        return onCommentSubmit(edit);
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
                                <Tag size="large" color="violet" className="diff">
                                    {dateDiff(new Date(comment.createTime))}
                                </Tag>
                            </div>
                        </div>
                    </div>
                    <div className="comment-func">
                        <Tooltip content="回复">
                            <IconComment
                                onClick={() => {
                                    setIsReply(!isReply);
                                    setQuote(undefined);
                                    handleCommentReply(comment);
                                }}
                            />
                        </Tooltip>
                        <Tooltip content="引用">
                            <IconQuote
                                className="comment-func-quote"
                                onClick={() => {
                                    if (!isReply) {
                                        setIsReply(true);
                                    }
                                    scrollToEdit();
                                    setQuote(comment);
                                    handleCommentReply(comment);
                                }}
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
                            marginBottom: 5,
                            padding: 10,
                        }}
                    >
                        <CommentEdit
                            isReply={true}
                            quote={quote?.content}
                            rows={4}
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
