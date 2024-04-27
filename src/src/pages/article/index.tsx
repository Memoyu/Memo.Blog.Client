import PageBanner from '@components/page-banner';
import ArticleList from '../article/components/article-list';

import './index.scss';
import { usePageVisit } from '@src/hooks/usePageVisit';
import Footer from '@src/components/layout/footer';

const Index = () => {
    usePageVisit();

    return (
        <div className="blog-article-list">
            <PageBanner image="http://oss.blog.memoyu.com/articles/banner/502a2248-2ee7-48eb-af67-c5b0b9a9a5f1.png" />

            {/* 文章列表，带文章分类头部 */}
            <ArticleList />
            <Footer />
        </div>
    );
};

export default Index;
