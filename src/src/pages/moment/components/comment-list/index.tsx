import { FC, useEffect, useRef } from 'react';
import { Toast } from '@douyinfe/semi-ui';

import { useData } from '@src/hooks/useData';

import CommentItem from './comment-item';

import { commentPage } from '@utils/request';

import { CommentModel, CommentPageRequest, CommentType } from '@common/model';

import './index.scss';

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const commentPageSize = 15;
    const [comments, commentLoading, setComments, setCommentLoading] =
        useData<Array<CommentModel>>();
    const commentPageRef = useRef<number>(1);
    const commentTotalRef = useRef<number>(Infinity);

    // 获取文章
    let getMomentCommentPage = () => {
        if (commentLoading) return;
        setCommentLoading(true);

        let request = {
            commentType: CommentType.Moment,
            page: commentPageRef.current,
            size: commentPageSize,
        } as CommentPageRequest;

        commentPage(request)
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                // 如果总数被清空，则视为列表也需要清空
                if (commentPageRef.current == 1) setComments([]);

                // console.log('当前页：', momentPageRef.current);
                commentTotalRef.current = res.data.total;
                // console.log('当前总条数：', momentTotalRef);

                let items: Array<CommentModel> = [];
                res.data.items.forEach((a) => {
                    if ((comments ?? []).findIndex((ar) => a.commentId == ar?.commentId) < 0) {
                        items.push(a);
                    }
                });

                setComments(items);
                // console.log('当前：', items);
            })
            .finally(() => setCommentLoading(false));
    };

    useEffect(() => {
        getMomentCommentPage();
    }, []);

    return (
        <div className="moment-comment-list-wrap">
            {comments?.map((comment: CommentModel) => {
                return (
                    <div style={{ margin: '15px 0' }}>
                        <CommentItem
                            key={comment.commentId}
                            comment={comment}
                            childrens={
                                comment.childs &&
                                comment.childs.length > 0 &&
                                comment.childs?.map((cc) => (
                                    <CommentItem key={cc.commentId} comment={cc} />
                                ))
                            }
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Index;
