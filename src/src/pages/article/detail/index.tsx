import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button, Empty, Toast, Typography } from '@douyinfe/semi-ui';
import { IllustrationNoResult } from '@douyinfe/semi-illustrations';
import { IconLikeHeart, IconComment } from '@douyinfe/semi-icons';

import MarkDown from '@components/markdown/article';
import MarkdownNav from './components/navbar';
import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import CommentList from './components/comment-list';
import LabelList from './components/label-list';
import TagList from './components/tag-list';
import Copyright from './components/copyright';

import { useParams } from 'react-router-dom';
import { usePageVisit } from '@src/hooks/usePageVisit';

import { dateDiff } from '@src/utils/date';

import { ArticleModel } from '@src/common/model';

import { articleGet, articleLike } from '@src/utils/request';

import './index.scss';
import StickyBox from 'react-sticky-box';

const { Title, Text } = Typography;

const Index = () => {
    const params = useParams();

    const [article, setArticle] = useState<ArticleModel>();
    const [loading, setLoading] = useState<boolean>();
    const [articleId, setArticleId] = useState<string>('');
    const [isLike, setIsLike] = useState<boolean>();
    const [likes, setLikes] = useState<number>(0);

    // 获取文章详情
    const getArticleDetail = (id: string) => {
        setLoading(true);

        articleGet(id)
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                let article = res.data;
                setArticle(article);
                setIsLike(article.isLike);
                setLikes(article.likes);
            })
            .finally(() => setLoading(false));
    };

    const handleArticleLikeClick = (id: string) => {
        if (article?.isLike) return;

        articleLike(id).then((res) => {
            if (!res.isSuccess) {
                Toast.error(res.message);
                return;
            }
            setIsLike(true);
            setLikes((old) => old + 1);
        });
    };

    usePageVisit(params.id);

    useEffect(() => {
        var articleId = params.id;
        // console.log(params);
        if (articleId) {
            setArticleId(articleId);
            getArticleDetail(articleId);
        }
    }, [params]);

    return article && !loading ? (
        <PageContainer>
            <header
                className="article-header"
                style={{ backgroundImage: `url(${article?.banner})` }}
            >
                <ContentContainer className="article-header-main">
                    {article && (
                        <div className="article-header-main-content">
                            <div>
                                <Title className="article-header-main-content-title">
                                    {article?.title}
                                </Title>
                                <Text className="article-header-main-content-desc">
                                    {article?.description}
                                </Text>
                            </div>

                            <div style={{ marginTop: 10 }}>
                                <LabelList
                                    labels={[
                                        {
                                            label: '作者',
                                            title: article?.author?.nickname,
                                            desc: ` 本文共${article?.wordNumber ?? 0}字，阅读约需${
                                                article?.readingTime ?? 0
                                            }分钟`,
                                        },
                                        {
                                            label: '发布时间',
                                            title:
                                                article?.createTime &&
                                                dateDiff(new Date(article.createTime)),
                                            desc:
                                                article?.createTime &&
                                                format(
                                                    new Date(article.createTime),
                                                    'yyyy-MM-dd HH:mm'
                                                ),
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    )}
                </ContentContainer>
            </header>

            <div className="article-section">
                <ContentContainer className="article-section-conyainer">
                    <div className="article-section-main">
                        <div className="article-section-main-content">
                            <MarkDown content={article?.content} />
                        </div>

                        <div className="article-section-main-nav">
                            <StickyBox offsetTop={58}>
                                <MarkdownNav content={article?.content} />
                            </StickyBox>
                        </div>
                    </div>
                    <div className="article-section-footer">
                        <TagList tags={article?.tags} />

                        <Copyright articleId={articleId} />
                    </div>
                </ContentContainer>
            </div>

            <div className="article-bottom">
                <ContentContainer className="article-bottom-like">
                    <Button type="primary" theme="solid" icon={<IconComment />} onClick={() => {}}>
                        {article.comments}
                    </Button>
                    <Button
                        type="primary"
                        theme="solid"
                        icon={
                            <IconLikeHeart
                                style={{
                                    color: isLike
                                        ? 'rgba(var(--semi-red-6), 1)'
                                        : 'rgba(var(--semi-white), 1)',
                                }}
                            />
                        }
                        onClick={() => handleArticleLikeClick(article.articleId)}
                    >
                        {likes}
                    </Button>
                </ContentContainer>

                <ContentContainer className="article-bottom-comment">
                    {article && article?.commentable && <CommentList articleId={articleId} />}
                </ContentContainer>
            </div>
        </PageContainer>
    ) : (
        <PageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Empty
                image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
                title="文章走失了！"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            ></Empty>
        </PageContainer>
    );
};

export default Index;
