import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Empty, Toast, Typography } from '@douyinfe/semi-ui';
import { IllustrationNoResult } from '@douyinfe/semi-illustrations';

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

import { articleGet } from '@src/utils/request';

import './index.scss';
import StickyBox from 'react-sticky-box';

const { Title, Text } = Typography;

const Index = () => {
    const params = useParams();

    const [article, setArticle] = useState<ArticleModel>();
    const [loading, setLoading] = useState<boolean>();
    const [articleId, setArticleId] = useState<string>('');

    // 获取文章详情
    let getArticleDetail = async (id: string) => {
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
            <div className="article-comment">
                <ContentContainer className="article-comment-main">
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
