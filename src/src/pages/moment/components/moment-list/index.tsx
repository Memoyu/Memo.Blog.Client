import { FC, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Avatar, Typography, Space, Timeline, Toast, Tag } from '@douyinfe/semi-ui';
import InfiniteScroll from 'react-infinite-scroller';

import MarkDown from '@components/markdown';
import MomentItemExtra from './moment-item-extra';

import { useData } from '@src/hooks/useData';

import { dateDiff } from '@utils/date';
import { momentPage } from '@utils/request';

import { Data } from '@douyinfe/semi-ui/lib/es/timeline';
import { MomentModel, MomentPageRequest } from '@common/model';
import { useTypedSelector } from '@src/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { setMoments } from '@redux/slices/moment/momentSlice';

import './index.scss';

interface TimelineItemData extends Data {
    moment: MomentModel;
}

interface ComProps {
    height?: number;
}

const { Text } = Typography;

const Index: FC<ComProps> = ({ height = 1000 }) => {
    const dispatch = useDispatch();

    const moments = useTypedSelector((state) => state.moments);

    const momentPageSize = 7;
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

                momentTotalRef.current = res.data.total;
                // 如果总数被清空，则视为列表也需要清空
                dispatch(setMoments({ moments: res.data.items, init: momentPageRef.current == 1 }));
                // console.log('当前：', items);
            })
            .finally(() => setMomentLoading(false));
    };

    let loadMoreMomentPage = () => {
        // console.log('加载更多');
        momentPageRef.current += 1;
        getMomentPage();
    };

    useEffect(() => {
        getMomentPage();
    }, []);

    return (
        <div className="moment-list">
            <div style={{ maxHeight: height, padding: 5, overflow: 'auto', overflowX: 'hidden' }}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    threshold={20}
                    loadMore={loadMoreMomentPage}
                    hasMore={!momentLoading && moments.length < momentTotalRef.current}
                    useWindow={false}
                >
                    <Timeline mode="left">
                        {moments.map((m) => {
                            return (
                                <Timeline.Item
                                    key={m.momentId}
                                    // time={format(new Date(m.createTime), 'yyyy-MM-dd HH:mm')}
                                    dot={<Avatar size="small" src={m.announcer.avatar} />}
                                    extra={<MomentItemExtra moment={m} />}
                                >
                                    <div className="moment-list-item">
                                        <Space spacing="tight">
                                            <div className="name">{m.announcer.nickname}</div>
                                            <Text>
                                                {format(new Date(m.createTime), 'yyyy-MM-dd HH:mm')}
                                            </Text>
                                            <Tag size="large" color="violet">
                                                {dateDiff(new Date(m.createTime))}
                                            </Tag>
                                        </Space>
                                        <div className="moment-list-item-content">
                                            <MarkDown content={m.content} />
                                        </div>
                                    </div>
                                </Timeline.Item>
                            );
                        })}
                    </Timeline>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Index;
