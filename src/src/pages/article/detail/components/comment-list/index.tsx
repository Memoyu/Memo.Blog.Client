import { FC, useEffect, useRef } from 'react';
import { Toast } from '@douyinfe/semi-ui';

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
    const commentPageSize = 7;
    const [comments, _commentLoading, setComments, setCommentLoading] = useData<
        Array<CommentModel>
    >([]);
    const commentPageRef = useRef<number>(1);
    const commentTotalRef = useRef<number>(Infinity);

    // 获取动态评论
    let getArticleCommentPage = () => {
        setCommentLoading(true);

        let request = {
            belongId: articleId,
            commentType: CommentType.Article,
            page: commentPageRef.current,
            size: commentPageSize,
        } as CommentPageRequest;
        commentPage(request)
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                commentTotalRef.current = res.data.total;
                setComments(res.data.items);
            })
            .finally(() => setCommentLoading(false));
    };

    const handleCommentSubmit = async (input: CommentEditInput) => {
        return await doCommentSubmit({
            visitorId: input.visitorId,
            content: input.content,
            commentType: CommentType.Article,
            belongId: articleId, // 能提交评论，说明一定存在articleId
        });
    };

    const doCommentSubmit = async (comment: CommentEditRequest) => {
        let res = await commentCreate(comment);

        if (!res.isSuccess || !res.data) {
            Toast.error(res.message);
            return false;
        }
        getArticleCommentPage();
        return true;
    };

    useEffect(() => {
        getArticleCommentPage();
    }, [articleId]);

    return (
        <div className="moment-comment-list-wrap">
            <div className="moment-comment-edit">
                <div
                    style={{
                        backgroundColor: 'rgb(var(--semi-violet-0))',
                        margin: '5px 0',
                        padding: 10,
                    }}
                >
                    <CommentEdit rows={6} onSubmit={handleCommentSubmit} />
                </div>
            </div>

            <div
                className="moment-comment-list"
                style={{ maxHeight: 1000, padding: 5, overflow: 'auto' }} // , overflowX: 'hidden'
            >
                <div className="moment-comment-list">
                    {comments?.map((comment: CommentModel) => (
                        <div key={comment.commentId + 'wrap'} style={{ margin: '15px 0' }}>
                            <CommentItem
                                key={comment.commentId}
                                comment={comment}
                                onCommentSubmit={doCommentSubmit}
                                childrens={
                                    comment.childs &&
                                    comment.childs.length > 0 &&
                                    comment.childs?.map((cc) => (
                                        <CommentItem
                                            key={cc.commentId}
                                            comment={cc}
                                            onCommentSubmit={doCommentSubmit}
                                        />
                                    ))
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;
