import { useState } from 'react';
import { Col, Row } from '@douyinfe/semi-ui';

import Container from '@components/layout/container';
import PageBanner from '@components/page-banner';
import CommentEdit from '@components/comment-edit';
import MomentList from './components/moment-list';
import CommentList from './components/comment-list';
import Footer from '@components/layout/footer';

import './index.scss';
import { usePageVisit } from '@src/hooks/usePageVisit';

const Index = () => {
    usePageVisit();

    return (
        <div>
            <PageBanner
                height={400}
                image="http://oss.blog.memoyu.com/articles/bdbb6831-bccb-4139-96c7-b85395038d5e.png"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <div className="moment-comment-edit">
                    <CommentEdit
                    // onCreateSuccess={() => getMomentCommentPage()}
                    />
                </div>
            </PageBanner>
            <Container className="timeline-content">
                <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }}>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                        <MomentList />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                        <CommentList />
                    </Col>
                </Row>
            </Container>

            <Footer />
        </div>
    );
};

export default Index;
