import { Typography } from '@douyinfe/semi-ui';

import PageBanner from '@components/page-banner';
import Summary from './components/summary';
import CallMe from '../../components/call-me';

import './index.scss';

const { Title } = Typography;

const Index = () => {
    return (
        <div className="blog-home">
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
                            <div
                                style={{
                                    margin: '10px 20px',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <CallMe />
                            </div>
                        </div>
                    </div>
                </div>
            </PageBanner>
        </div>
    );
};

export default Index;
