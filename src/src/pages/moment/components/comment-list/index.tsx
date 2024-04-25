import { FC, useEffect, useRef, useState } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import { useDispatch } from 'react-redux';
import {
    pushMomentComment,
    unshiftMomentComment,
    setMomentComments,
} from '@redux/slices/moment/momentCommentSlice';
import { increaseMomentComments } from '@redux/slices/moment/momentSlice';

import { useTypedSelector } from '@src/hooks/useTypedSelector';
import { useData } from '@src/hooks/useData';

import CommentItem from './comment-item';
import CommentEdit, { CommentInputInfo } from '@src/components/comment-edit';

import { commentPage, commentCreate } from '@utils/request';

import { CommentModel, CommentPageRequest, CommentType } from '@common/model';

import './index.scss';

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const dispatch = useDispatch();
    const momentId = useTypedSelector((state) => state.momentCommentMomentId);
    const comments = useTypedSelector((state) => state.momentComments);

    const commentPageSize = 15;
    const [commentLoading, setCommentLoading] = useState<boolean>();
    const commentPageRef = useRef<number>(1);
    const commentTotalRef = useRef<number>(Infinity);

    // 获取文章
    let getMomentCommentPage = () => {
        if (commentLoading) return;
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

                // 如果总数被清空，则视为列表也需要清空
                // if (commentPageRef.current == 1)

                // console.log('当前页：', momentPageRef.current);
                commentTotalRef.current = res.data.total;
                // console.log('当前总条数：', momentTotalRef);

                //console.log('当前e：', comments);
                // let items: Array<CommentModel> = [...comments];
                // res.data.items.forEach((a) => {
                //     if (comments.findIndex((ar) => a.commentId == ar.commentId) < 0) {
                //         // console.log('22222');
                //         items.push(a);
                //     }
                // });

                // console.log('当前：', items);
                dispatch(setMomentComments(res.data.items));
            })
            .finally(() => setCommentLoading(false));
    };

    useEffect(() => {
        getMomentCommentPage();
    }, [momentId]);

    const handleReplySuccess = (comment: CommentModel) => {
        dispatch(pushMomentComment(comment));
    };

    const handleCommentSubmit = (input: CommentInputInfo) => {
        commentCreate({
            visitorId: input.visitorId,
            content: input.content,
            commentType: CommentType.Moment,
            belongId: momentId,
        }).then((res) => {
            if (!res.isSuccess || !res.data) {
                Toast.error(res.message);
                return;
            }

            dispatch(unshiftMomentComment(res.data));
            dispatch(increaseMomentComments({ momentId: momentId, count: 1 }));
        });
    };

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
                        <CommentEdit rows={4} onSubmit={handleCommentSubmit} />
                    </div>
                </div>
            )}
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
                                    <CommentItem
                                        key={cc.commentId}
                                        comment={cc}
                                        onReplySuccess={handleReplySuccess}
                                    />
                                ))
                            }
                            onReplySuccess={handleReplySuccess}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
