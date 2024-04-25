import { useRef, useEffect } from 'react';
import { store } from '@redux/store';
import { visitorCreate, visitLogCreate } from '@src/utils/request';
import { VisitorLogEditRequest } from '@src/common/model';
import { initVisitorId } from '@redux/slices/visitor/visitorSlice';

/**
 * 访客访问记录
 * @param visitedId 访问目标的标识，如文章Id
 */
export function usePageVisit(visitedId?: string) {
    const pathRef = useRef('');
    const initialized = useRef(false);

    useEffect(() => {
        // 设置当前页面地址
        pathRef.current = window.location.href;

        if (!initialized.current) {
            initialized.current = true;
            addVisitLog();
        }
    }, []);

    const addVisitLog = () => {
        // 获取访客信息
        let visitor = store.getState().visitor;

        //TODO: 获取当前设备信息
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        // console.log('platform', platform, userAgent);
        let os = '';
        let browser = '';

        let log = {
            visitedId,
            path: pathRef.current,
            os,
            browser,
        } as VisitorLogEditRequest;

        if (!visitor.visitorId) {
            visitorCreate({}).then((res) => {
                if (!res.isSuccess || !res.data) return;
                log.visitorId = res.data;
                store.dispatch(initVisitorId(log.visitorId));
                createVisitLog(log);
            });
        } else {
            log.visitorId = visitor.visitorId;
            createVisitLog(log);
        }
    };

    let createVisitLog = (visitLog: VisitorLogEditRequest) => {
        console.log('visitLogCreate', visitLog);
        visitLogCreate(visitLog);
    };
}