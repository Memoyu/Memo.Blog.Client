import { FC, useEffect } from 'react';
import { Toast } from '@douyinfe/semi-ui';

import CommentEdit, { CommentInputInfo } from '@components/comment-edit';

import './index.scss';
import { commentCreate } from '@src/utils/request';
import { CommentModel, CommentType } from '@src/common/model';

export interface MomentCommentReply {
    belongId?: string;
    parentId?: string;
    commentId?: string;
    floor?: string;
    replyTo: string;
    content: string;
}

interface ComProps {
    reply?: MomentCommentReply;
    quote?: CommentModel;

    onCreateSuccess?: () => void;
}

const Index: FC<ComProps> = ({ reply, quote, onCreateSuccess }) => {
    useEffect(() => {}, [reply, quote]);

    const handleAddCommentClick = (input: CommentInputInfo) => {
        // 获取父评论Id
        let parentId = reply && (reply.parentId || reply.commentId);
        // 获取回复评论Id
        let replyId = reply && reply.commentId;
        commentCreate({
            parentId,
            replyId,
            nickname: input.nickname,
            content: input.content,
            commentType: CommentType.Moment,
            belongId: 0,
            email: input.email,
            avatar: input.avatar,
            avatarOrigin: input.avatarOrigin,
            avatarOriginType: input.avatarOriginType,
        }).then((res) => {
            if (!res.isSuccess) {
                Toast.error(res.message);
                return;
            }
            onCreateSuccess && onCreateSuccess();
        });
    };

    return (
        <div className="moment-comment-edit-wrap">
            <CommentEdit
                quote={quote}
                rows={4}
                onSubmit={(input) => handleAddCommentClick(input)}
            />
        </div>
    );
};

export default Index;
