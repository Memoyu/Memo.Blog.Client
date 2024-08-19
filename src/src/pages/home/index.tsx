import { Typography } from '@douyinfe/semi-ui';
import { Link } from 'react-router-dom';

import PageContainer from '@src/components/layout/page-container';
import PageBanner from '@components/page-banner';
import Summary from './components/summary';

import { usePageVisit } from '@src/hooks/usePageVisit';
import { useConfig } from '@src/stores';

import './index.scss';

const { Title, Text } = Typography;

const Index = () => {
    usePageVisit();
    const homeBanner = useConfig((state) => state.banner.home);

    return (
        <PageContainer className="blog-home">
            <PageBanner height="100vh" banner={homeBanner} showOrigin={false}>
                <div className="blog-home-content">
                    <Title heading={2}>你好！</Title>
                    <div style={{ display: 'flex', marginTop: 10 }}>
                        <Text style={{ fontSize: '2em', fontWeight: 200 }}>我是</Text>
                        <Text strong style={{ marginLeft: 10, fontSize: '2em' }}>
                            Memoyu
                        </Text>
                    </div>

                    <Title style={{ marginTop: 40 }} heading={2}>
                        欢迎来到我的博客。
                    </Title>
                </div>
                <div className="blog-home-bottom">
                    <Link
                        target="_blank"
                        to={homeBanner.originUrl ? homeBanner.originUrl : ''}
                        className="blog-home-bottom-pic-link"
                    >
                        <Text strong type="secondary">
                            {homeBanner.title}
                        </Text>
                    </Link>
                    <div className="blog-home-bottom-summary">
                        <Summary />
                    </div>
                </div>
            </PageBanner>
        </PageContainer>
    );
};

export default Index;
