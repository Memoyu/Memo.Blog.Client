import React, { FC, useEffect, useState, useRef } from 'react';
import { Masonry } from 'react-plock';
import { throttle } from 'lodash';

import './index.scss';
import { ArticlePageModel, ArticlePageRequest } from '@src/common/model';
import { articlePage } from '@src/utils/request';
import { Toast } from '@douyinfe/semi-ui';
import { useOnMountUnsafe } from '@src/hooks/useOnMountUnsafe';

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const articlesRef = useRef<Array<ArticlePageModel>>([]);
    const lastTriggerScrollTimeRef = useRef<number>(0);
    const currentPageRef = useRef<number>(1);
    const articleTotalRef = useRef<number>(Infinity);
    const pageSize = 15;
    const [loading, setLoading] = useState<boolean>(false);

    let getArticlePage = () => {
        // console.log('当前总条数：', articleTotalRef.current);

        if (loading) return;
        if (articlesRef.current.length >= articleTotalRef.current) return;

        setLoading(true);

        let request = {
            page: currentPageRef.current,
            size: pageSize,
        } as ArticlePageRequest;

        articlePage(request)
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                currentPageRef.current += 1;
                // console.log('当前页：', currentPageRef.current);

                let items = res.data.items;
                articleTotalRef.current = res.data.total;
                // console.log('当前总条数：', res.data.total);
                articlesRef.current = [...articlesRef.current, ...items];
                // console.log('当前：', articlesRef.current);
            })
            .finally(() => setLoading(false));
    };

    useOnMountUnsafe(() => {
        getArticlePage();

        window.addEventListener('scroll', throttledScrollHandler);

        return () => {
            window.removeEventListener('scroll', throttledScrollHandler);
        };
    });

    let getScrollTop = () => {
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    };

    let handleScroll = () => {
        var now = new Date().getTime();
        if (
            now - lastTriggerScrollTimeRef.current > 500 &&
            getScrollTop() + window.innerHeight + 1000 >= document.body.scrollHeight
        ) {
            // console.log('触发滚动');
            getArticlePage();

            lastTriggerScrollTimeRef.current = now;
        }
    };

    // 使用节流
    let throttledScrollHandler = throttle(handleScroll, 200);

    return (
        <Masonry
            items={articlesRef.current}
            config={{
                columns: [1, 2, 3, 4],
                gap: [24, 16, 16, 16],
                media: [520, 640, 768, 1024],
            }}
            render={(item, idx) => (
                <div key={idx} style={{ backgroundColor: 'grey' }}>
                    {item.banner.length != 0 && (
                        <img
                            key={idx}
                            src={item.banner}
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    )}

                    <div>{item.title}</div>
                    <div>{item.description}</div>
                </div>
            )}
        />
    );
};

export default Index;
