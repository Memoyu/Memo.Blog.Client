import { Button, Image, Typography } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';

import Container from '@components/layout/container';
import PageBanner from '@components/page-banner';
import Summary from './components/summary';
import CallMe from './components/call-me';
import ArticleList from './components/article-list';

import './index.scss';

const { Title } = Typography;

const Index = () => {
    const navigate = useNavigate();

    return (
        <div
            className="blog-home"
            onScroll={() => {
                console.log('滚动了！！');
            }}
        >
            <PageBanner
                height="100vh"
                image="http://oss.blog.memoyu.com/articles/banner/2dba0a75-4bf9-471c-8ee8-fe957321a902.png"
            >
                <div className="blog-home-content">
                    <Title heading={2}>你好！</Title>
                    <div style={{ display: 'flex', marginTop: 10 }}>
                        <Title weight="light" heading={3}>
                            我是
                        </Title>
                        <Title heading={3} style={{ marginLeft: 10 }}>
                            Memoyu
                        </Title>
                    </div>

                    <Title style={{ marginTop: 10 }} heading={3}>
                        欢迎来到我的博客。
                    </Title>
                    <div className="blog-home-content-bottom">
                        <div>
                            <Summary />
                            <CallMe />
                        </div>
                    </div>
                </div>
            </PageBanner>
            <Container>
                <div style={{ marginTop: 30 }}>
                    <ArticleList />
                </div>
            </Container>
        </div>
    );
};

export default Index;
