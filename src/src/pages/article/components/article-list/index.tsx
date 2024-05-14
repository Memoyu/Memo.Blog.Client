import { FC, useState, useRef, CSSProperties, useEffect } from 'react';
import { Masonry } from 'react-plock';
import { Card, Badge, TagGroup, Toast, Typography } from '@douyinfe/semi-ui';
import { IconActivity, IconVerify } from '@douyinfe/semi-icons';
import { NavLink } from 'react-router-dom';

import { dateDiff } from '@utils/date';
import { articlePage } from '@utils/request';

import { useSearchParams } from 'react-router-dom';
import { IScrollProps, useContentScroll } from '@src/hooks/useContentScroll';

import { ArticlePageModel, ArticlePageRequest } from '@src/common/model';
import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';

import './index.scss';

const { Title, Text } = Typography;

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const [params] = useSearchParams();

    const articlesRef = useRef<Array<ArticlePageModel>>([]);
    const lastTriggerScrollTimeRef = useRef<number>(0);
    const currentPageRef = useRef<number>(1);
    const articleTotalRef = useRef<number>(Infinity);
    const categoryIdRef = useRef<string>('');
    const pageSize = 15;
    const [loading, setLoading] = useState<boolean>(false);

    // 获取文章
    let getArticlePage = () => {
        // console.log('当前总条数：', articleTotalRef.current, articlesRef.current.length);
        if (loading) return;

        setLoading(true);

        let request = {
            categoryId: categoryIdRef.current,
            page: currentPageRef.current,
            size: pageSize,
        } as ArticlePageRequest;

        // 获取文章列表
        articlePage(request)
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                // 如果总数被清空，则视为列表也需要清空
                if (currentPageRef.current == 1) articlesRef.current = [];

                // console.log('当前页：', currentPageRef.current);
                let items = res.data.items;
                articleTotalRef.current = res.data.total;
                // console.log('当前总条数：', res.data.total);

                items.forEach((a) => {
                    if (articlesRef.current.findIndex((ar) => a.articleId == ar.articleId) < 0) {
                        articlesRef.current.push(a);
                    }
                });

                articlesRef.current = [...articlesRef.current];
                // console.log('当前：', articlesRef.current);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        let categoryId = params.getAll('category')[0];
        categoryIdRef.current = categoryId;

        getArticlePage();

        return () => {
            currentPageRef.current = 1;
        };
    }, [params]);

    useContentScroll((props: IScrollProps) => {
        // console.log('触发滚动', props);

        var now = new Date().getTime();
        if (
            now - lastTriggerScrollTimeRef.current > 500 &&
            props.scrollTop + window.innerHeight + 1000 >= document.body.scrollHeight
        ) {
            // 判断是否仍然继续加载文章
            if (loading || articlesRef.current.length >= articleTotalRef.current) return;
            currentPageRef.current += 1;

            // console.log('加载数据', currentPageRef.current, articlesRef.current.length);

            getArticlePage();

            lastTriggerScrollTimeRef.current = now;
        }
    });

    // 获取文章角标
    let getArticleBadge = (item: ArticlePageModel) => {
        let sty = { fontSize: 20 } as CSSProperties;

        let now = new Date().getTime();
        if (item.isTop) {
            return <IconVerify style={{ ...sty, color: 'var(--semi-color-primary)' }} />;
        }
        if ((now - new Date(item.createTime).getTime()) / (1000 * 60 * 60 * 24) < 90) {
            return <IconActivity style={{ ...sty }} />;
        }
    };

    return (
        <div className="article-list-container">
            <div style={{ marginTop: 20 }}>
                <Masonry
                    items={articlesRef.current}
                    config={{
                        columns: [1, 2, 3, 4],
                        gap: [24, 16, 16, 16],
                        media: [520, 640, 768, 1024],
                    }}
                    render={(item: ArticlePageModel) => (
                        <Badge key={item.articleId} count={getArticleBadge(item)} type="danger">
                            <Card
                                className="article-item-card"
                                shadows="hover"
                                style={{ cursor: 'default' }}
                                bodyStyle={{
                                    padding: 10,
                                    backgroundColor: 'rgb(var(--semi-grey-0))',
                                }}
                            >
                                <NavLink
                                    // key={item.articleId}
                                    to={`detail/${item.articleId}`}
                                    //to={`/detail`}
                                >
                                    {item.banner.length != 0 && (
                                        <img
                                            src={item.banner}
                                            loading="lazy"
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                        />
                                    )}

                                    <Title
                                        style={{ textAlign: 'center', margin: '10px 0' }}
                                        heading={5}
                                    >
                                        {item.title}
                                    </Title>
                                </NavLink>
                                <div style={{ margin: 20 }}>
                                    <Text type="tertiary">{item.description}</Text>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '0 15px',
                                        marginBottom: 10,
                                    }}
                                >
                                    <TagGroup
                                        maxTagCount={2}
                                        showPopover
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        tagList={item.tags.map((t) => {
                                            return {
                                                tagKey: t.tagId,
                                                color: 'purple',
                                                children: t.name,
                                            } as TagProps;
                                        })}
                                        size="large"
                                    />
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        {dateDiff(new Date(item.createTime))}
                                    </Text>
                                </div>
                            </Card>
                        </Badge>
                    )}
                />
            </div>
        </div>
    );
};

export default Index;
