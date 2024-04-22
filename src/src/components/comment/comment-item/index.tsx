import React from 'react';
import { Tooltip } from '@douyinfe/semi-ui';

import './index.scss';
import { CommentModel } from '@src/common/model';

type Props = {
    comment: CommentModel;
};

const CommentItem: React.FC<Props> = ({ comment }) => {
    return (
        <div
        // className={classNames([
        //     s.commentItem,
        //     comment.isAutor ? s.rightCommentItem : s.leftCommentItem,
        // ])}
        >
            <div className="article-comment-item-box">
                <img className="article-comment-item-avatar" src={comment.avatar} />
            </div>
            <div className="article-comment-item-box">
                <div className="article-comment-item-comment-info">
                    {/* <div>#{comment.sort}楼</div>
                    <div className={s.name}>{comment.name}</div>
                    <div>{comment.date}</div> */}
                    <Tooltip title={'回复'}>
                        {/* <NumberOutlined className={s.iconAt} /> */}
                    </Tooltip>
                    <Tooltip title={'引用'}>{/* <MessageOutlined /> */}</Tooltip>
                </div>
                <div className="article-comment-item-comment-content">
                    <div>{comment.content}</div>
                </div>
            </div>
        </div>
    );
};

export default CommentItem;
