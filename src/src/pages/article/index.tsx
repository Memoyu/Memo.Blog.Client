import StickyBox from 'react-sticky-box';
import PageBanner from '@components/page-banner';
import ArticleList from '../article/components/article-list';
import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import CategoryList from './components/category-list';

import { usePageVisit } from '@src/hooks/usePageVisit';
import { useIsPresent } from 'framer-motion';

import './index.scss';

const Index = () => {
    const isPresent = useIsPresent();

    usePageVisit();

    return (
        <PageContainer className="blog-article-list">
            <PageBanner image="http://oss.blog.memoyu.com/articles/banner/502a2248-2ee7-48eb-af67-c5b0b9a9a5f1.png" />
            {isPresent && (
                <StickyBox offsetTop={58} className="article-list-category-sticky">
                    <CategoryList />
                </StickyBox>
            )}
            {/* 文章列表，带文章分类头部 */}
            <ContentContainer>
                <ArticleList />
            </ContentContainer>
        </PageContainer>
    );
};

export default Index;
