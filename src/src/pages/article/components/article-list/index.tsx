import { FC, useState, useRef, CSSProperties, useEffect } from 'react';
import { Masonry } from 'react-plock';
import { Card, Badge, TagGroup, Toast, Typography, Button } from '@douyinfe/semi-ui';
import {
    IconActivity,
    IconEyeOpened,
    IconComment,
    IconLikeHeart,
    IconVerify,
} from '@douyinfe/semi-icons';
import { NavLink } from 'react-router-dom';

import { dateDiff } from '@utils/date';
import { articlePage } from '@utils/request';

import { useSearchParams } from 'react-router-dom';

import { ArticlePageModel, ArticlePageRequest } from '@src/common/model';
import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';

import './index.scss';

const { Title, Text } = Typography;

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const [params] = useSearchParams();

    const categoryIdRef = useRef<string>('');
    const articlesLe = useRef<number>(0);
    const currentPageRef = useRef<number>(1);
    const pageSize = 20;
    const [loading, setLoading] = useState<boolean>(false);
    const [articleTotal, setArticleTotal] = useState<number>(0);
    const [articles, setArticles] = useState<Array<ArticlePageModel>>([]);

    // 获取文章
    let getArticlePage = (init: boolean = true) => {
        // console.log('当前总条数：', articleTotalRef.current, articlesLe.current);
        if (loading) return;

        setLoading(true);
        let page = currentPageRef.current;

        if (init) {
            page = 1;
        }

        let request = {
            categoryId: categoryIdRef.current,
            page: page,
            size: pageSize,
        } as ArticlePageRequest;

        // 获取文章列表
        articlePage(request)
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                // console.log('当前页：', page);
                let items = res.data.items;
                setArticleTotal(res.data.total);
                // articleTotalRef.current = res.data.total;

                setArticles((prev) => {
                    // console.log('当前：init', init, prev);

                    let news = init ? [] : [...prev];
                    items.forEach((a) => {
                        if (news.findIndex((ar) => a.articleId == ar.articleId) < 0) {
                            news.push(a);
                        }
                    });
                    articlesLe.current = news.length;
                    // console.log('加载完成：', news, articlesLe.current);
                    return news;
                });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        let categoryId = params.getAll('category')[0];
        categoryIdRef.current = categoryId;

        getArticlePage();
    }, [params]);

    const handlerLoadMoreClick = () => {
        currentPageRef.current += 1;
        getArticlePage(false);
    };

    const loadMoreRender =
        articles.length < articleTotal ? (
            <Button theme="borderless" onClick={handlerLoadMoreClick}>
                加载更多
            </Button>
        ) : (
            <Text style={{ color: 'var(--semi-color-primary)', fontWeight: 800 }}>
                {articleTotal == 0 ? '空空如也！' : '已经到底咯!'}
            </Text>
        );

    // 获取文章角标
    let getArticleBadge = (item: ArticlePageModel) => {
        let sty = { fontSize: 20 } as CSSProperties;

        if (item.isTop) {
            return <IconVerify style={{ ...sty, color: 'var(--semi-color-primary)' }} />;
        }

        let now = new Date().getTime();
        if ((now - new Date(item.createTime).getTime()) / (1000 * 60 * 60 * 24) < 90) {
            return <IconActivity style={{ ...sty, color: 'var(--semi-color-text-0)' }} />;
        }
    };

    return (
        <div className="article-list-container">
            <div style={{ margin: '20px 0' }}>
                <Masonry
                    items={articles}
                    config={{
                        columns: [1, 2, 3, 4],
                        gap: [24, 16, 16, 16],
                        media: [600, 870, 1024, 1200],
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
                                    className="article-item-card-header"
                                    to={`detail/${item.articleId}`}
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
                                <div className="article-item-card-desc">
                                    <Text type="tertiary">{item.description}</Text>
                                </div>
                                <div className="article-item-card-tags">
                                    <TagGroup
                                        maxTagCount={3}
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
                                </div>
                                <div className="article-item-card-footer">
                                    <div className="article-item-card-footer-like">
                                        <div className="like-item">
                                            <IconEyeOpened />
                                            <Text style={{ marginLeft: 3 }}>{item.views}</Text>
                                        </div>

                                        <div className="like-item">
                                            <IconLikeHeart />
                                            <Text style={{ marginLeft: 3 }}>{item.likes}</Text>
                                        </div>

                                        {item.commentable && (
                                            <div className="like-item">
                                                <IconComment />
                                                <Text style={{ marginLeft: 3 }}>
                                                    {item.comments}
                                                </Text>
                                            </div>
                                        )}
                                    </div>
                                    <Text style={{ display: 'flex', alignItems: 'center' }}>
                                        {dateDiff(new Date(item.createTime))}
                                    </Text>
                                </div>
                            </Card>
                        </Badge>
                    )}
                />
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 30,
                }}
            >
                {loadMoreRender}
            </div>
        </div>
    );
};

export default Index;
