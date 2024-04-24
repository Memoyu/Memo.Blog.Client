import { FC, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Avatar, Typography, Space, Timeline, Toast, Tag, TagGroup } from '@douyinfe/semi-ui';
import { IconLikeHeart, IconComment } from '@douyinfe/semi-icons';

import MarkDown from '@components/markdown';

import { useData } from '@src/hooks/useData';

import { dateDiff } from '@utils/date';
import { momentPage } from '@utils/request';

import { Data } from '@douyinfe/semi-ui/lib/es/timeline';
import { MomentModel, MomentPageRequest } from '@common/model';

import './index.scss';
import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';

interface TimelineItemData extends Data {
    moment: MomentModel;
}

interface ComProps {
    onReply?: (moment: MomentModel) => void;
}

const { Text } = Typography;

const Index: FC<ComProps> = ({ onReply }) => {
    const momentPageSize = 15;
    const [moments, momentLoading, setMoments, setMomentLoading] =
        useData<Array<TimelineItemData>>();
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

                let items: Array<TimelineItemData> = [];
                res.data.items.forEach((a) => {
                    if ((moments ?? []).findIndex((ar) => a.momentId == ar.moment.momentId) < 0) {
                        items.push(buildTimelineItem(a));
                    }
                });

                setMoments(items);
                // console.log('当前：', items);
            })
            .finally(() => setMomentLoading(false));
    };

    useEffect(() => {
        getMomentPage();
    }, []);

    // 构建时间轴项
    const buildTimelineItem = (moment: MomentModel) => {
        let item: TimelineItemData = {
            moment: moment,
            // time: format(new Date(moment.createTime), 'yyyy-MM-dd HH:mm'),
            dot: <Avatar size="small" src={moment.announcer.avatar} />,
            content: timelineItemContentRender(moment),
            extra: (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Space spacing="tight">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                                <IconLikeHeart /> <Text style={{ marginLeft: 3 }}>{123}</Text>
                            </div>
                            <div
                                style={{
                                    marginLeft: 15,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={() => onReply && onReply(moment)}
                            >
                                <IconComment />
                                <Text style={{ marginLeft: 3 }}>{123}</Text>
                            </div>
                        </div>
                    </Space>
                    <TagGroup
                        maxTagCount={4}
                        tagList={moment.tags.map((t, idx) => {
                            return {
                                tagKey: idx,
                                color: 'purple',
                                children: t,
                            } as TagProps;
                        })}
                        size="large"
                        showPopover
                    />
                </div>
            ),
        };

        return item;
    };

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

    return (
        <div className="moment-list">
            <Timeline mode="left" dataSource={moments} />
        </div>
    );
};

export default Index;
