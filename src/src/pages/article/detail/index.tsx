import React from 'react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import MarkDown from '@components/markdown';
import MarkdownNav from '@components/markdown-nav';
import { Tag, Space, Toast, Typography } from '@douyinfe/semi-ui';

import LabelList from './components/label-list';
import PageBanner from '@components/page-banner';
import Comment from '@components/comment';

import { useParams } from 'react-router-dom';
import { useData } from '@src/hooks/useData';

import { ArticleModel } from '@src/common/model';

import { articleGet } from '@src/utils/request';

import './index.scss';
import { dateDiff } from '@src/utils/date';
import Container from '@src/components/layout/container';

const { Title, Text } = Typography;

const Index = () => {
    const params = useParams();

    const [article, loading, setArticle, setLoading] = useData<ArticleModel>();
    const [comments, setComments] = useState();

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

    useEffect(() => {
        var articleId = params.id;
        if (articleId) {
            getArticleDetail(articleId);
        }
    }, []);

    return (
        <div>
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
                                    title: article?.author.nickname,
                                    desc: ` 本文共${article?.wordNumber ?? 0}字，阅读约需${
                                        article?.readingTime ?? 0
                                    }分钟`,
                                },
                                {
                                    label: '发布时间',
                                    title: article && dateDiff(new Date(article.createTime)),
                                    desc:
                                        article &&
                                        format(new Date(article.createTime), 'yyyy-MM-dd HH:mm'),
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <Container className="article-detail-content">
                {/* <Space wrap>
                    {article?.tags.map((item) => (
                        <Tag key={item.tagId}>{item.name}</Tag>
                    ))}
                </Space> */}

                <MarkDown content={article?.content} />
                <MarkdownNav content={article?.content} />
            </Container>
            {/* TODO:完善评论系统 */}
            {/* <Comment comments={comments} /> */}
        </div>
    );
};

export default Index;
