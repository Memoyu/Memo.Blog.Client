import { Data } from '@douyinfe/semi-ui/lib/es/timeline';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MomentModel } from '@src/common/model';
import { format } from 'date-fns';
import { Avatar, Typography, Space, Timeline, Toast, Tag } from '@douyinfe/semi-ui';

import MarkDown from '@components/markdown';

import { useData } from '@src/hooks/useData';

import { dateDiff } from '@utils/date';
import { momentPage } from '@utils/request';

import MomentItemExtra from '@pages/moment/components/moment-list/moment-item-extra';

export interface TimelineItemData extends Data {
    moment: MomentModel;
}

const { Text } = Typography;
// 时间轴项渲染元素
const timelineItemContentRender = (moment: MomentModel) => (
    <div className="moment-list-item">
        <Space spacing="tight">
            <div className="name">{moment.announcer.nickname}</div>
            <Text>{format(new Date(moment.createTime), 'yyyy-MM-dd HH:mm')}</Text>
            <Tag size="large" color="violet">
                {dateDiff(new Date(moment.createTime))}
            </Tag>
        </Space>
        <div className="moment-list-item-content">
            <MarkDown content={moment.content} />
        </div>
    </div>
);

// 构建时间轴项
const buildTimelineItem = (moment: MomentModel) => {
    let item: TimelineItemData = {
        moment: moment,
        // time: format(new Date(moment.createTime), 'yyyy-MM-dd HH:mm'),
        dot: <Avatar size="small" src={moment.announcer.avatar} />,
        content: timelineItemContentRender(moment),
        extra: <MomentItemExtra moment={moment} />,
    };

    return item;
};

const momentSlice = createSlice({
    name: 'moments',
    initialState: [] as Array<TimelineItemData>,
    reducers: {
        setMoments: (state: Array<TimelineItemData>, action: PayloadAction<Array<MomentModel>>) => {
            let moments = action.payload;

            let items: Array<TimelineItemData> = [];
            moments.forEach((a) => {
                items.push(buildTimelineItem(a));
            });
            state = items;
            return state;
        },

        unshiftMoment: (state: Array<TimelineItemData>, action: PayloadAction<MomentModel>) => {
            var moment = action.payload;
            state.unshift(buildTimelineItem(moment));
        },
    },
});

export const { setMoments, unshiftMoment } = momentSlice.actions;

export const MomentReducer = momentSlice.reducer;
