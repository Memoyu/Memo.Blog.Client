import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import PageBanner from '@components/page-banner';
import MomentList from './components/moment-list';

import { usePageVisit } from '@src/hooks/usePageVisit';

import './index.scss';

const Index = () => {
    const height = 1200;

    usePageVisit();

    return (
        <PageContainer>
            <PageBanner
                image="http://oss.blog.memoyu.com/articles/bdbb6831-bccb-4139-96c7-b85395038d5e.png"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
            <ContentContainer className="moment-section">
                <MomentList height={height} />
            </ContentContainer>
        </PageContainer>
    );
};

export default Index;
