import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { Toast, Typography } from '@douyinfe/semi-ui';

import MarkDown from '@components/markdown';
import MarkdownNav from './components/navbar';
import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import CommentList from './components/comment-list';
import LabelList from './components/label-list';
import TagList from './components/tag-list';
import Copyright from './components/copyright';

import { useParams } from 'react-router-dom';
import { useData } from '@src/hooks/useData';
import { usePageVisit } from '@src/hooks/usePageVisit';

import { dateDiff } from '@src/utils/date';

import { ArticleModel } from '@src/common/model';

import { articleGet } from '@src/utils/request';

import './index.scss';
import StickyBox from 'react-sticky-box';

const { Title, Text } = Typography;

const Index = () => {
    const params = useParams();

    const [article, _loading, setArticle, _setLoading] = useData<ArticleModel>({} as ArticleModel);
    const [articleId, setArticleId] = useState<string>('');

    // 获取文章详情
    let getArticleDetail = async (id: string) => {
        let res = await articleGet(id);
        if (!res.isSuccess || !res.data) {
            Toast.error(res.message);
            return;
        }

        let article = res.data;
        setArticle(article);
    };

    usePageVisit(params.id);

    useEffect(() => {
        var articleId = params.id;
        // console.log(params);
        if (articleId) {
            setArticleId(articleId);
            getArticleDetail(articleId);
        }
    }, []);

    return (
        <PageContainer>
            <header
                className="article-header"
                style={{ backgroundImage: `url(${article?.banner})` }}
            >
                <div className="article-header-content">
                    <div>
                        <Title className="article-header-content-title">{article?.title}</Title>
                        <Text className="article-header-content-desc">{article?.description}</Text>
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
                                        format(new Date(article.createTime), 'yyyy-MM-dd HH:mm'),
                                },
                            ]}
                        />
                    </div>
                </div>
            </header>
            <div className="article-section">
                <ContentContainer className="article-section-main">
                    <div className="article-section-main-content">
                        <MarkDown content={article?.content} />

                        <TagList tags={article?.tags} />

                        <Copyright articleId={articleId} />
                    </div>

                    <div className="article-section-main-nav">
                        <StickyBox offsetTop={58}>
                            <MarkdownNav content={article?.content} />
                        </StickyBox>
                    </div>
                </ContentContainer>

                <ContentContainer className="article-section-comment">
                    {article.commentable && <CommentList articleId={articleId} />}
                </ContentContainer>
            </div>
        </PageContainer>
    );
};

export default Index;
