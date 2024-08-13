import StickyBox from 'react-sticky-box';
import PageBanner from '@components/page-banner';
import ArticleList from '../article/components/article-list';
import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import CategoryList from './components/category-list';

import { usePageVisit } from '@src/hooks/usePageVisit';
import { useIsPresent } from 'framer-motion';
import { useConfig } from '@src/stores';

import './index.scss';

const Index = () => {
    const isPresent = useIsPresent();

    usePageVisit();
    const bannerUrl = useConfig((state) => state.banner.article);

    return (
        <PageContainer className="blog-article-list">
            <PageBanner image={bannerUrl} />
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
