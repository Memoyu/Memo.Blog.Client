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
            <ContentContainer className="timeline-content">
                {/* <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }}>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                        <MomentList height={height} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                        <CommentList height={height} />
                    </Col>
                </Row> */}
                <MomentList height={height} />
            </ContentContainer>
        </PageContainer>
    );
};

export default Index;
