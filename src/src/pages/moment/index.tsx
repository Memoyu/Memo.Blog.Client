import { useState } from 'react';

import Container from '@components/layout/container';
import PageBanner from '@components/page-banner';
import CommentEdit, { MomentCommentReply } from './components/comment-edit';
import MomentList from './components/moment-list';
import CommentList from './components/comment-list';
import Footer from '@components/layout/footer';

import './index.scss';
import { Col, Row } from '@douyinfe/semi-ui';
import { CommentModel, MomentModel } from '@src/common/model';

const Index = () => {
    const [reply, setReply] = useState<MomentCommentReply>();
    const [quote, setQuote] = useState<CommentModel>();

    const handleCommentReply = (comment: CommentModel) => {
        setReply({
            parentId: comment.parentId,
            commentId: comment.commentId,
            floor: comment.floorString,
            replyTo: comment.nickname,
            content: comment.content,
        });
    };
    const handleMomentReply = (moment: MomentModel) => {
        setReply({
            belongId: moment.momentId,
            replyTo: `${moment.announcer.nickname} 动态`,
            content: moment.content,
        });
    };

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
                        reply={reply}
                        quote={quote}
                    />
                </div>
            </PageBanner>
            <Container className="timeline-content">
                <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 }}>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                        <MomentList onReply={(m) => handleMomentReply(m)} />
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
