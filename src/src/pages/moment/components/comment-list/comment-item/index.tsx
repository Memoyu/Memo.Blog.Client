import React, { ReactNode, useState } from 'react';
import { format } from 'date-fns';
import { IconQuote, IconComment } from '@douyinfe/semi-icons';
import { Avatar, Space, Tag, Tooltip, Typography } from '@douyinfe/semi-ui';

import CommentEdit, { MomentCommentReply } from '../../comment-edit';
import MarkDown from '@components/markdown';

import { dateDiff } from '@utils/date';

import './index.scss';
import { CommentModel } from '@src/common/model';

type Props = {
    comment: CommentModel;
    childrens?: ReactNode;
};

const { Text } = Typography;

const CommentItem: React.FC<Props> = ({ comment, childrens }) => {
    const [isReply, setIsReply] = useState<boolean>(false);
    const [reply, setReply] = useState<MomentCommentReply>();
    const [quote, setQuote] = useState<CommentModel>();

    const handleCommentReply = (comment: CommentModel) => {
        setReply({
            parentId: comment.parentId,
            commentId: comment.commentId,
            floor: comment.floorString,
            replyTo: comment.nickname,
            content: comment.content,
        });
    };

    return (
        <div key={comment.commentId} className="moment-comment-item">
            {/* flexShrink: 0 解决flex下头像变形问题 */}
            <Avatar style={{ margin: '0 10px', flexShrink: 0 }} size="small" src={comment.avatar} />
            <div className="moment-comment-item-box">
                <div className="moment-comment-item-box-info">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Space spacing="tight" style={{ display: 'flex', alignItems: 'baseline' }}>
                            <Text strong>{comment.floorString}</Text>
                            <div className="name">{comment.nickname}</div>
                            <Text>{format(new Date(comment.createTime), 'yyyy-MM-dd HH:mm')}</Text>
                            <Tag size="large" color="violet">
                                {dateDiff(new Date(comment.createTime))}
                            </Tag>
                        </Space>

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
                <div className="moment-comment-item-box-reply">
                    {comment.reply && (
                        <Text type="tertiary">{`回复 ${comment.reply.floorString} ${comment.reply.nickname}`}</Text>
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
                            // onCreateSuccess={() => getMomentCommentPage()}
                            reply={reply}
                            quote={quote}
                        />
                    </div>
                )}

                {childrens && <div className="moment-comment-item-box-childs">{childrens}</div>}
            </div>
        </div>
    );
};

export default CommentItem;
