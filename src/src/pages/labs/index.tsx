import { CSSProperties } from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { IconConfig, IconToken } from '@douyinfe/semi-icons-lab';

import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import PageBanner from '@components/page-banner';
import Tools from './components/tools';
import OpenSources from './components/open-source';

import { usePageVisit } from '@src/hooks/usePageVisit';

import './index.scss';

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
        <PageContainer className="blog-labs">
            <PageBanner image="http://oss.blog.memoyu.com/page/about/banner/fc873d0f-b4bf-414b-8458-930de1d12d5d.png" />
            <ContentContainer style={{ marginBottom: 20 }}>
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
            </ContentContainer>
        </PageContainer>
    );
};

export default Index;
