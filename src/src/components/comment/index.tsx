import React, { useState } from 'react';

import CommentItem from './comment-item';
import CommentEdit from './comment-edit';
import { CommentModel } from '@src/common/model';

import './index.scss';

type Props = {
    comments?: Array<CommentModel>;
};

const Comment: React.FC<Props> = ({ comments }) => {
    return (
        <div className="article-comment-box">
            <div className="article-comment-box-divider" />
            <div className="article-comment-box-list">
                <div>
                    {comments?.map((comment: CommentModel) => {
                        return (
                            <div key={comment.commentId}>
                                <CommentItem comment={comment} />
                            </div>
                        );
                    })}
                </div>
            </div>
            <CommentEdit />
        </div>
    );
};

export default Comment;
