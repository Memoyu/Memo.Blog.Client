import { FC, useEffect, useState } from 'react';
import { Pagination, Toast } from '@douyinfe/semi-ui';
import { useDispatch } from 'react-redux';

import { increaseArticleCommentTotal } from '@redux/slices/article/detailSlice';

import CommentItem from './comment-item';
import CommentEdit, { CommentEditInput } from '@src/components/comment-edit';

import { commentPage, commentCreate } from '@utils/request';

import { CommentEditRequest, CommentModel, CommentPageRequest, CommentType } from '@common/model';

import './index.scss';
import { useData } from '@src/hooks/useData';

interface ComProps {
    articleId: string;
}

const Index: FC<ComProps> = ({ articleId }) => {
    const dispatch = useDispatch();

    const commentPageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [commentTotal, setCommentTotal] = useState(1);
    const [comments, _commentLoading, setComments, setCommentLoading] = useData<
        Array<CommentModel>
    >([]);

    // 获取动态评论
    let getArticleCommentPage = (page: number = 1) => {
        setCommentLoading(true);
        setCurrentPage(page);

        let request = {
            belongId: articleId,
            commentType: CommentType.Article,
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

    const handleCommentSubmit = async (input: CommentEditInput) => {
        return await doCommentSubmit({
            content: input.content,
            commentType: CommentType.Article,
            belongId: articleId, // 能提交评论，说明一定存在articleId
        });
    };

    const doCommentSubmit = async (comment: CommentEditRequest, page?: number) => {
        let res = await commentCreate(comment);

        if (!res.isSuccess || !res.data) {
            Toast.error(res.message);
            return false;
        }

        dispatch(increaseArticleCommentTotal(1));
        getArticleCommentPage(page);
        return true;
    };

    const handleCommentPageChange = (page: number) => {
        getArticleCommentPage(page);
    };

    useEffect(() => {
        if (articleId) getArticleCommentPage();
    }, [articleId]);

    return (
        <div className="comments-wrap">
            <div className="comments-wrap-edit">
                <CommentEdit rows={6} onSubmit={handleCommentSubmit} />
            </div>

            <div className="comments-wrap-list">
                <div className="moment-comment-list">
                    {comments?.map((comment: CommentModel) => (
                        <div key={comment.commentId + 'wrap'} style={{ margin: '15px 0' }}>
                            <CommentItem
                                key={comment.commentId}
                                comment={comment}
                                onCommentSubmit={(input) => doCommentSubmit(input, currentPage)}
                                childrens={
                                    comment.childs &&
                                    comment.childs.length > 0 &&
                                    comment.childs?.map((cc) => (
                                        <CommentItem
                                            key={cc.commentId}
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
