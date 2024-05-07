import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { getLocalStorage, setLocalStorage } from '@utils/storage';

import { AvatarOriginType, VisitorModel } from '@src/common/model';
import { VISITOR_INFO } from '@common/constant';
import { visitorUpdate } from '@src/utils/request';
import { store } from '@src/redux/store';

export interface UpdateVisitorModel {
    nickname: string;
    email?: string;
    avatar?: string;
    avatarOriginType?: AvatarOriginType;
    avatarOrigin?: string;
}

const initialVisitor = JSON.parse(getLocalStorage(VISITOR_INFO) ?? '{}');
const initialVisitorState: VisitorModel = initialVisitor;

const visitorSlice = createSlice({
    name: 'visitor',
    initialState: initialVisitorState,
    reducers: {
        initVisitorId: (state: VisitorModel, action: PayloadAction<string>) => {
            state.visitorId = action.payload;
            setLocalStorage(VISITOR_INFO, JSON.stringify(state));
            return state;
        },

        setVisitorInfo: (state: VisitorModel, action: PayloadAction<UpdateVisitorModel>) => {
            let visitor = action.payload;

            state.nickname = visitor.nickname;
            state.email = visitor.email;
            state.avatar = visitor.avatar;
            state.avatarOriginType = visitor.avatarOriginType;
            state.avatarOrigin = visitor.avatarOrigin;

            setLocalStorage(VISITOR_INFO, JSON.stringify(state));

            visitorUpdate({ ...state }).then((res) => {
                if (!res.isSuccess || !res.data) return;
                store.dispatch(initVisitorId(res.data));
            });

            return state;
        },
    },
});

export const { initVisitorId, setVisitorInfo } = visitorSlice.actions;

export const VisitorSliceReducer = visitorSlice.reducer;
