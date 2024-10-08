import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Empty, Toast, Typography } from '@douyinfe/semi-ui';
import { IllustrationNoResult, IllustrationConstruction } from '@douyinfe/semi-illustrations';
import StickyBox from 'react-sticky-box';

import MarkDown from '@components/markdown/article';
import MarkdownCatalog from '@components/markdown/md-catalog';
import PageContainer from '@components/layout/page-container';
import ContentContainer from '@components/layout/content-container';
import CommentList from '@components/comment-list';
import LabelList from './components/label-list';
import Copyright from './components/copyright';

import { useParams } from 'react-router-dom';
import { usePageVisit } from '@src/hooks/usePageVisit';
import { useArticleComment } from '@src/stores';

import { dateDiff } from '@src/utils/date';

import { ArticleModel, CommentType } from '@src/common/model';

import { articleGet } from '@src/utils/request';

import './index.scss';

const { Title, Text } = Typography;

const Index = () => {
    const params = useParams();
    const incrementCommentTotal = useArticleComment((state) => state.incrementCommentTotal);

    const [article, setArticle] = useState<ArticleModel>();
    const [loading, setLoading] = useState<boolean>();
    const [articleId, setArticleId] = useState<string>('');

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
            })
            .finally(() => setLoading(false));
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

    return article ? (
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

                            <div className="article-header-main-content-labs">
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
                                                article?.publishTime &&
                                                dateDiff(new Date(article.publishTime)),
                                            desc:
                                                article?.publishTime &&
                                                format(
                                                    new Date(article.publishTime),
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

            <ContentContainer className="article-section">
                <div className="article-section-main">
                    <div className="article-section-main-content">
                        <MarkDown articleId={article?.articleId} content={article?.content} />
                    </div>

                    <div className="article-section-main-nav">
                        <StickyBox offsetTop={58}>
                            <MarkdownCatalog articleId={article?.articleId} />
                        </StickyBox>
                    </div>
                </div>

                <div className="article-section-bottom">
                    <Copyright article={article} />
                </div>
            </ContentContainer>

            <div className="article-bottom">
                {article && article?.commentable && (
                    <ContentContainer className="article-bottom-comment">
                        <CommentList
                            belongId={articleId}
                            commentType={CommentType.Article}
                            incrementTotal={incrementCommentTotal}
                        />
                    </ContentContainer>
                )}
            </div>
        </PageContainer>
    ) : (
        <PageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Empty
                image={
                    loading ? (
                        <IllustrationConstruction style={{ width: 150, height: 150 }} />
                    ) : (
                        <IllustrationNoResult style={{ width: 150, height: 150 }} />
                    )
                }
                title={loading ? '加载中......' : '文章走失了！'}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
        </PageContainer>
    );
};

export default Index;
