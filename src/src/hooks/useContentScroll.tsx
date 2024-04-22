import { useEffect } from 'react';
import { throttle } from 'lodash';
import { BLOG_LAYOUT_CONTENT_ID } from '@src/common/constant';

export interface IScrollProps {
    scrollTop: number;
}

const contentId = BLOG_LAYOUT_CONTENT_ID;

export function useContentScroll(effect: (props: IScrollProps) => void) {
    const getContentElement = () => document.getElementById(contentId);

    const handleScroll = () => {
        let st = getContentElement()?.scrollTop ?? 0;
        effect({ scrollTop: st });
    };

    // 使用节流
    const throttledScrollHandler = throttle(handleScroll, 200);

    useEffect(() => {
        let contentElement = getContentElement();
        contentElement?.addEventListener('scroll', throttledScrollHandler);
        return () => {
            contentElement?.removeEventListener('scroll', throttledScrollHandler);
        };
    }, []);
}
