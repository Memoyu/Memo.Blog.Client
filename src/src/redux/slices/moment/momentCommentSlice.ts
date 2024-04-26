import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CommentModel, CommentPageRequest, CommentType } from '@src/common/model';

const initPage = {
    belongId: undefined,
    commentType: CommentType.Moment,
    page: 1,
    size: 7,
} as CommentPageRequest;

const momentCommentPageSlice = createSlice({
    name: 'moment-commemt-list-page',
    initialState: initPage,
    reducers: {
        setMomentId: (state: CommentPageRequest, action: PayloadAction<string>) => {
            state.belongId = action.payload;
            return state;
        },

        nextPage: (state: CommentPageRequest) => {
            state.page += 1;
            return state;
        },

        firstPage: (state: CommentPageRequest) => {
            state.page = initPage.page;
            return state;
        },
    },
});

const momentCommentSlice = createSlice({
    name: 'moment-commemt-list',
    initialState: [] as Array<CommentModel>,
    reducers: {
        setMomentComments: (
            state: Array<CommentModel>,
            action: PayloadAction<{ comments: Array<CommentModel>; init?: boolean }>
        ) => {
            let comments = action.payload.comments;
            let init = action.payload.init;
            if (init) {
                state = comments;
            } else {
                comments.forEach((c) => {
                    if (state.findIndex((s) => s.commentId == c.commentId) < 0) {
                        state.push(c);
                    }
                });
            }
            return state;
        },

        pushMomentComment: (state: Array<CommentModel>, action: PayloadAction<CommentModel>) => {
            // 将评论插入子楼
            var comment = action.payload;

            // 插入子评论
            state.forEach((c) => {
                if (c.commentId == comment.parentId) c.childs?.push(comment);
            });

            return state;
        },

        unshiftMomentComment: (state: Array<CommentModel>, action: PayloadAction<CommentModel>) => {
            // 将评论插入主楼
            var comment = action.payload;

            state.unshift(comment);

            return state;
        },
    },
});

export const { setMomentId, nextPage, firstPage } = momentCommentPageSlice.actions;

export const { setMomentComments, pushMomentComment, unshiftMomentComment } =
    momentCommentSlice.actions;

export const MomentCommentPageReducer = momentCommentPageSlice.reducer;
export const MomentCommentReducer = momentCommentSlice.reducer;
