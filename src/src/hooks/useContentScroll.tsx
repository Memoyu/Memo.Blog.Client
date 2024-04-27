import { useEffect } from 'react';
import { throttle } from 'lodash';

export interface IScrollProps {
    scrollTop: number;
}

export function useContentScroll(effect: (props: IScrollProps) => void) {
    const getContentElement = () => document.documentElement;

    const handleScroll = () => {
        // console.log('22222', document.documentElement.scrollTop, document.body.scrollTop);
        let st = getContentElement()?.scrollTop ?? 0;
        effect({ scrollTop: st });
    };

    // 使用节流
    const throttledScrollHandler = throttle(handleScroll, 200);

    useEffect(() => {
        window.addEventListener('scroll', throttledScrollHandler);
        return () => {
            window.removeEventListener('scroll', throttledScrollHandler);
        };
    }, []);
}
