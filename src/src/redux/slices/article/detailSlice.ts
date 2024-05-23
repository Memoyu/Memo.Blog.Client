import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const articleDetailCommentTotalSlice = createSlice({
    name: 'moment-list',
    initialState: 0,
    reducers: {
        setArticleCommentTotal: (state: number, action: PayloadAction<number>) => {
            state = action.payload;
            return state;
        },

        increaseArticleCommentTotal: (state: number, action: PayloadAction<number>) => {
            state = state + action.payload;
            return state;
        },
    },
});

export const { setArticleCommentTotal, increaseArticleCommentTotal } =
    articleDetailCommentTotalSlice.actions;

export const articleDetailCommentTotalReducer = articleDetailCommentTotalSlice.reducer;
