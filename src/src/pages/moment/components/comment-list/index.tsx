import { FC, useEffect, useRef, useState } from 'react';
import { List, Toast } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@src/hooks/useTypedSelector';

import { unshiftMomentComment, setMomentComments } from '@redux/slices/moment/momentCommentSlice';
import { increaseMomentComments } from '@redux/slices/moment/momentSlice';

import CommentItem from './comment-item';
import CommentEdit, { CommentEditInput } from '@src/components/comment-edit';

import { commentPage, commentCreate } from '@utils/request';

import { CommentModel, CommentPageRequest, CommentType } from '@common/model';

import './index.scss';

interface ComProps {
    height?: number;
}

const Index: FC<ComProps> = ({ height = 1000 }) => {
    const dispatch = useDispatch();
    const momentId = useTypedSelector((state) => state.momentCommentMomentId);
    const comments = useTypedSelector((state) => state.momentComments);

    const commentPageSize = 7;
    const [commentLoading, setCommentLoading] = useState<boolean>();
    const commentPageRef = useRef<number>(1);
    const commentTotalRef = useRef<number>(Infinity);

    // 获取动态评论
    let getMomentCommentPage = () => {
        setCommentLoading(true);

        let request = {
            belongId: momentId,
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

                commentTotalRef.current = res.data.total;
                dispatch(
                    setMomentComments({
                        comments: res.data.items,
                        init: commentPageRef.current == 1,
                    })
                );
            })
            .finally(() => setCommentLoading(false));
    };

    const handleCommentSubmit = async (input: CommentEditInput) => {
        let res = await commentCreate({
            visitorId: input.visitorId,
            content: input.content,
            commentType: CommentType.Moment,
            belongId: momentId, // 能提交评论，说明一定存在momentid
        });

        if (!res.isSuccess || !res.data) {
            Toast.error(res.message);
            return false;
        }

        dispatch(unshiftMomentComment(res.data));
        dispatch(increaseMomentComments({ momentId: momentId, count: 1 }));

        return true;
    };

    let loadMoreMomentCommentPage = () => {
        // console.log('加载更多');
        commentPageRef.current += 1;
        getMomentCommentPage();
    };

    useEffect(() => {
        commentPageRef.current = 1;
        getMomentCommentPage();
    }, [momentId]);

    return (
        <div className="moment-comment-list-wrap">
            {momentId && (
                <div className="moment-comment-edit">
                    <div
                        style={{
                            backgroundColor: 'rgb(var(--semi-violet-0))',
                            margin: '5px 0',
                            padding: 10,
                        }}
                    >
                        <CommentEdit rows={4} onSubmit={(e) => handleCommentSubmit(e)} />
                    </div>
                </div>
            )}
            <div
                className="moment-comment-list"
                style={{ maxHeight: height, padding: 5, overflow: 'auto' }} // , overflowX: 'hidden'
            >
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    threshold={20}
                    loadMore={loadMoreMomentCommentPage}
                    hasMore={!commentLoading && comments.length < commentTotalRef.current}
                    useWindow={false}
                >
                    <div className="moment-comment-list">
                        {comments?.map((comment: CommentModel) => (
                            <div key={comment.commentId + 'wrap'} style={{ margin: '15px 0' }}>
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
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Index;
