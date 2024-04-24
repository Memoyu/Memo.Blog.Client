import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CommentModel } from '@src/common/model';

const momentCommentSlice = createSlice({
    name: 'moments',
    initialState: [] as Array<CommentModel>,
    reducers: {
        setMomentComments: (
            state: Array<CommentModel>,
            action: PayloadAction<Array<CommentModel>>
        ) => {
            state = action.payload;
            return action.payload;
        },

        pushMomentComment: (state: Array<CommentModel>, action: PayloadAction<CommentModel>) => {
            var comment = action.payload;
            // 插入子评论
            state.forEach((c) => {
                if (c.commentId == comment.parentId) c.childs?.push(comment);
            });
        },

        unshiftMomentComment: (state: Array<CommentModel>, action: PayloadAction<CommentModel>) => {
            var comment = action.payload;
            state.unshift(comment);
        },
    },
});

export const { setMomentComments, pushMomentComment, unshiftMomentComment } =
    momentCommentSlice.actions;

export const MomentCommentReducer = momentCommentSlice.reducer;
