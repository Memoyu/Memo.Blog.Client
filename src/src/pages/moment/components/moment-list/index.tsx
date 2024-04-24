import { FC, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Avatar, Typography, Space, Timeline, Toast, Tag } from '@douyinfe/semi-ui';

import MarkDown from '@components/markdown';

import { useData } from '@src/hooks/useData';

import { dateDiff } from '@utils/date';
import { momentPage } from '@utils/request';

import { Data } from '@douyinfe/semi-ui/lib/es/timeline';
import { MomentModel, MomentPageRequest } from '@common/model';
import { useTypedSelector } from '@src/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { TimelineItemData, setMoments, unshiftMoment } from '@redux/slices/moment/momentSlice';

import './index.scss';

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const dispatch = useDispatch();
    const moments = useTypedSelector((state) => state.moments);

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
