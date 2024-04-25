import { configureStore } from '@reduxjs/toolkit';
import { MomentCommentReducer } from './slices/moment/momentCommentSlice';
import { MomentReducer } from './slices/moment/momentSlice';
import { VisitorSliceReducer } from './slices/visitor/visitorSlice';

export const store = configureStore({
    reducer: {
        momentComments: MomentCommentReducer,
        moments: MomentReducer,
        visitor: VisitorSliceReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
