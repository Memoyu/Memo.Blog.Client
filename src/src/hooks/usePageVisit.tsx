import { useRef, useEffect } from 'react';
import { visitLogCreate } from '@src/utils/request';
import { VisitorLogEditRequest } from '@src/common/model';
import { getBrowser, getOs } from '@src/utils/user-agent';
import { useVisitor } from '@src/stores';

/**
 * 访客访问记录
 * @param visitedId 访问目标的标识，如文章Id
 */
export function usePageVisit(visitedId?: string) {
    const pathRef = useRef('');
    const initialized = useRef(false);
    const visitorId = useVisitor((state) => state.visitorId);
    const initVisitor = useVisitor((state) => state.initVisitor);

    useEffect(() => {
        // 设置当前页面地址
        pathRef.current = window.location.href;

        if (!initialized.current) {
            initialized.current = true;
            createVisitLog();
        }
    }, []);

    const createVisitLog = () => {
        // 获取当前设备信息
        let os = getOs();
        let browser = getBrowser();

        let log = {
            visitedId,
            path: pathRef.current,
            os,
            browser,
        } as VisitorLogEditRequest;

        // 再次确保visitorId是存在的，做一次兜底
        if (!visitorId) {
            initVisitor().then((res) => {
                // 创建访客成功，就记录访问日志
                if (res) visitLogCreate(log);
            });
        } else {
            visitLogCreate(log);
        }
    };
}
