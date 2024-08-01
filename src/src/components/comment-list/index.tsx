import { FC, useEffect, useState } from 'react';
import { Pagination, Toast } from '@douyinfe/semi-ui';

import CommentItem from './comment-item';
import CommentEdit, { CommentEditInput } from '@src/components/comment-edit';

import { useData } from '@src/hooks/useData';

import { commentPage, commentCreate } from '@utils/request';

import { CommentEditRequest, CommentModel, CommentPageRequest, CommentType } from '@common/model';

import './index.scss';

interface ComProps {
    belongId: string;
    commentType: CommentType;
    pageSize?: number;
    incrementTotal: (num: number) => void;
}

const Index: FC<ComProps> = ({ belongId, commentType, pageSize = 4, incrementTotal }) => {
    const commentPageSize = pageSize;
    const [currentPage, setCurrentPage] = useState(1);
    const [commentTotal, setCommentTotal] = useState(1);
    const [comments, _commentLoading, setComments, setCommentLoading] = useData<
        Array<CommentModel>
    >([]);

    // 获取评论分页
    let getCommentPage = (page: number = 1) => {
        setCommentLoading(true);
        setCurrentPage(page);

        let request = {
            belongId: belongId,
            commentType: commentType,
            page: page,
            size: commentPageSize,
        } as CommentPageRequest;

        // console.log(request);
        commentPage(request)
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                setComments(res.data.items);
                setCommentTotal(res.data.total || 0);
            })
            .finally(() => setCommentLoading(false));
    };

    // 触发提交文章评论
    const handleCommentSubmit = async (input: CommentEditInput) => {
        return await doCommentSubmit({
            content: input.content,
            commentType: commentType,
            belongId: belongId, // 能提交评论，说明一定存在articleId
        });
    };

    // 调用文章评论接口
    const doCommentSubmit = async (comment: CommentEditRequest, page?: number) => {
        let res = await commentCreate(comment);

        if (!res.isSuccess || !res.data) {
            Toast.error(res.message);
            return false;
        }

        incrementTotal(1);
        getCommentPage(page);
        return true;
    };

    // 触发评论分页变更
    const handleCommentPageChange = (page: number) => {
        getCommentPage(page);
    };

    useEffect(() => {
        if (belongId) getCommentPage();
    }, [belongId]);

    return (
        <div className="comment-wrap">
            <div className="comment-wrap-edit">
                <CommentEdit onSubmit={handleCommentSubmit} />
            </div>

            <div className="comment-wrap-list">
                <div className="comment-list">
                    {comments?.map((comment: CommentModel) => (
                        <div key={comment.commentId + 'wrap'} style={{ margin: '15px 0' }}>
                            <CommentItem
                                key={comment.commentId}
                                commentType={commentType}
                                comment={comment}
                                onCommentSubmit={(input) => doCommentSubmit(input, currentPage)}
                                childrens={
                                    comment.childs &&
                                    comment.childs.length > 0 &&
                                    comment.childs?.map((cc) => (
                                        <CommentItem
                                            key={cc.commentId}
                                            commentType={commentType}
                                            comment={cc}
                                            onCommentSubmit={(input) =>
                                                doCommentSubmit(input, currentPage)
                                            }
                                        />
                                    ))
                                }
                            />
                        </div>
                    ))}
                </div>
                {commentTotal > 0 && (
                    <Pagination
                        total={commentTotal}
                        currentPage={currentPage}
                        pageSize={commentPageSize}
                        style={{ marginTop: 12 }}
                        onPageChange={handleCommentPageChange}
                    />
                )}
            </div>
        </div>
    );
};

export default Index;
