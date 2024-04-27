import { CSSProperties } from 'react';
import { Typography } from '@douyinfe/semi-ui';

import { IconConfig, IconToken } from '@douyinfe/semi-icons-lab';

import Container from '@components/layout/container';
import PageBanner from '@components/page-banner';
import Tools from './components/tools';
import OpenSources from './components/open-source';
import './index.scss';
import { usePageVisit } from '@src/hooks/usePageVisit';
import Footer from '@src/components/layout/footer';

const { Title } = Typography;

const Index = () => {
    let dividerStyle: CSSProperties = {
        display: 'flex',
        margin: '22px',
        alignItems: 'center',
        justifyContent: 'center',
    };

    usePageVisit();

    return (
        <div className="blog-labs">
            <PageBanner image="http://oss.blog.memoyu.com/articles/banner/c683e041-e268-44b1-9076-023ce8230d5f.png" />
            <Container style={{ marginBottom: 20 }}>
                <div style={dividerStyle}>
                    <IconConfig style={{ marginRight: 10, fontSize: 20 }} />
                    <Title heading={5}> 常用工具</Title>
                </div>

                <div className="blog-labs-tools">
                    <Tools />
                </div>

                <div style={dividerStyle}>
                    <IconToken style={{ marginRight: 10, fontSize: 20 }} />
                    <Title heading={5}> 开源项目</Title>
                </div>
                <div className="blog-labs-open-source">
                    <OpenSources />
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default Index;
