import { FC, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Avatar, Typography, Space, Timeline, Toast, Tag } from '@douyinfe/semi-ui';

import MarkDown from '@components/markdown';
import MomentItemExtra from './moment-item-extra';

import { useData } from '@src/hooks/useData';

import { dateDiff } from '@utils/date';
import { momentPage } from '@utils/request';

import { Data } from '@douyinfe/semi-ui/lib/es/timeline';
import { MomentModel, MomentPageRequest } from '@common/model';
import { useTypedSelector } from '@src/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { setMoments, unshiftMoment } from '@redux/slices/moment/momentSlice';

import './index.scss';

interface TimelineItemData extends Data {
    moment: MomentModel;
}

interface ComProps {}

const { Text } = Typography;

const Index: FC<ComProps> = ({}) => {
    const dispatch = useDispatch();

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

    const moments = useTypedSelector((state) => {
        let moments = state.moments;

        let items: Array<TimelineItemData> = [];
        moments.forEach((a) => {
            items.push(buildTimelineItem(a));
        });

        return items;
    });

    const momentPageSize = 15;
    const [_moments, momentLoading, _setMoments, setMomentLoading] = useData<
        Array<TimelineItemData>
    >([]);
    const momentPageRef = useRef<number>(1);
    const momentTotalRef = useRef<number>(Infinity);

    // 获取文章
    let getMomentPage = () => {
        if (momentLoading) return;
        setMomentLoading(true);

        let request = {
            page: momentPageRef.current,
            size: momentPageSize,
        } as MomentPageRequest;

        momentPage(request)
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                // 如果总数被清空，则视为列表也需要清空
                if (momentPageRef.current == 1) setMoments([]);

                // console.log('当前页：', momentPageRef.current);
                momentTotalRef.current = res.data.total;
                // console.log('当前总条数：', momentTotalRef);

                dispatch(setMoments(res.data.items));
                // console.log('当前：', items);
            })
            .finally(() => setMomentLoading(false));
    };

    useEffect(() => {
        getMomentPage();
    }, []);

    return (
        <div className="moment-list">
            <Timeline mode="left" dataSource={moments} />
        </div>
    );
};

export default Index;
