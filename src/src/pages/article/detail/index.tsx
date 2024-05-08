import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import MarkDown from '@components/markdown';
import MarkdownNav from '@components/markdown-nav';
import { Toast, Typography } from '@douyinfe/semi-ui';

import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import CommentList from './components/comment-list';
import LabelList from './components/label-list';
import TagList from './components/tag-list';
import PageBanner from '@components/page-banner';
import Copyright from './components/copyright';

import { useParams } from 'react-router-dom';
import { useData } from '@src/hooks/useData';
import { usePageVisit } from '@src/hooks/usePageVisit';

import { dateDiff } from '@src/utils/date';

import { ArticleModel } from '@src/common/model';

import { articleGet } from '@src/utils/request';

import './index.scss';

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
            <div className="article-detail-header">
                <div className="article-detail-header-banner">
                    <PageBanner height={400} image={article?.banner} />
                </div>
                <div className="article-detail-header-content">
                    <div>
                        <Title className="article-detail-header-content-title">
                            {article?.title}
                        </Title>
                        <Text className="article-detail-header-content-desc">
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
                                        format(new Date(article.createTime), 'yyyy-MM-dd HH:mm'),
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <ContentContainer className="article-detail-content">
                <MarkdownNav content={article?.content} />

                <MarkDown content={article?.content} />

                <TagList tags={article?.tags} />

                <Copyright articleId={articleId} />

                <CommentList articleId={articleId} />
            </ContentContainer>
        </PageContainer>
    );
};

export default Index;
