import PageBanner from '@components/page-banner';

import './index.scss';
import { usePageVisit } from '@src/hooks/usePageVisit';

const Index = () => {
    usePageVisit();

    return (
        <div>
            <PageBanner image="http://oss.blog.memoyu.com/articles/bdbb6831-bccb-4139-96c7-b85395038d5e.png" />
            <div style={{ textAlign: 'center', width: '100%' }}>开发中。。。</div>
        </div>
    );
};

export default Index;
