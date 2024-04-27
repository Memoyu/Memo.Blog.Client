import Container from '@components/layout/container';
import PageBanner from '@components/page-banner';
import MomentList from './components/moment-list';
import Footer from '@components/layout/footer';

import { usePageVisit } from '@src/hooks/usePageVisit';

import './index.scss';

const Index = () => {
    const height = 1200;

    usePageVisit();

    return (
        <div>
            <PageBanner
                image="http://oss.blog.memoyu.com/articles/bdbb6831-bccb-4139-96c7-b85395038d5e.png"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
            <Container className="timeline-content">
                {/* <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }}>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                        <MomentList height={height} />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                        <CommentList height={height} />
                    </Col>
                </Row> */}
                <MomentList height={height} />
            </Container>
            <Footer />
        </div>
    );
};

export default Index;
