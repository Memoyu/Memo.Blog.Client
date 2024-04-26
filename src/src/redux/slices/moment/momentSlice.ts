import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MomentModel } from '@src/common/model';

const momentSlice = createSlice({
    name: 'moment-list',
    initialState: [] as Array<MomentModel>,
    reducers: {
        setMoments: (
            state: Array<MomentModel>,
            action: PayloadAction<{ moments: Array<MomentModel>; init?: boolean }>
        ) => {
            let moments = action.payload.moments;
            let init = action.payload.init;
            if (init) {
                state = moments;
            } else {
                moments.forEach((m) => {
                    if (state.findIndex((s) => s.momentId == m.momentId) < 0) {
                        state.push(m);
                    }
                });
            }
            return state;
        },

        unshiftMoment: (state: Array<MomentModel>, action: PayloadAction<MomentModel>) => {
            var moment = action.payload;
            state.unshift(moment);
        },

        increaseMomentComments: (
            state: Array<MomentModel>,
            action: PayloadAction<{ momentId: string; count: number }>
        ) => {
            var momentId = action.payload.momentId;
            var count = action.payload.count;

            state.forEach((m) => {
                if (m.momentId == momentId) {
                    m.comments += count;
                }
            });

            return state;
        },
    },
});

export const { setMoments, unshiftMoment, increaseMomentComments } = momentSlice.actions;

export const MomentReducer = momentSlice.reducer;
