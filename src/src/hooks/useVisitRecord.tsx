import { useState, useRef, useEffect } from 'react';
import { store } from '@redux/store';
import { generateVisitor, visitLogCreate } from '@src/utils/request';

const [path, setPath] = useState('');
const initialized = useRef(false);

const useVisitRecord = () => {
    useEffect(() => {
        // 设置当前页面地址
        setPath(window.location.href);

        if (!initialized.current) {
            initialized.current = true;
            // TODO: 做访客访问记录
        }
    }, []);

    const addVisitLog = () => {
        // 未标记pageid的，则不进行写入
        if (!props.pageId) return;

        // 获取访客信息
        let visitor = store.getState().visitor;

        //TODO: 获取当前设备信息
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        // console.log('platform', platform, userAgent);
        let os = '';
        let browser = '';

        let createVisitLog = (visitorId: string) => {
            console.log('visitLogCreate', visitorId, props);
            visitLogCreate({
                visitorId,
                path: props.path || '',
                behavior: props.pageId!,
                os,
                browser,
            });
        };

        console.log('增加访问日志', props);

        // if (!visitor.visitorId) {
        //     generateVisitor({ os, browser }).then((res) => {
        //         if (!res.isSuccess || !res.data) return;
        //         createVisitLog(res.data);
        //     });
        // } else {
        //     createVisitLog(visitor.visitorId);
        // }
    };
};
export default useVisitRecord;
