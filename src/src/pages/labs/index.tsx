import { CSSProperties } from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { IconConfig, IconToken } from '@douyinfe/semi-icons-lab';

import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import PageBanner from '@components/page-banner';
import Tools from './components/tools';
import OpenSources from './components/open-source';

import { usePageVisit } from '@src/hooks/usePageVisit';
import { useConfig } from '@src/stores';

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
    const labBanner = useConfig((state) => state.banner.lab);

    return (
        <PageContainer className="blog-labs">
            <PageBanner banner={labBanner} />
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
