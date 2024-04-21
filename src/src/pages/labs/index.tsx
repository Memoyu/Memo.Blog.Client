import { useState } from 'react';
import { Button, Divider, Modal, Typography } from '@douyinfe/semi-ui';

import { IconConfig, IconToken } from '@douyinfe/semi-icons-lab';

import Container from '@components/layout/container';
import PageBanner from '@components/page-banner';
import Tools from './components/tools';
import OpenSources from './components/open-source';

import { DividerProps } from '@douyinfe/semi-ui/lib/es/divider';

import './index.scss';

const { Title } = Typography;

const Index = () => {
    let dividerStyle: DividerProps = {
        margin: '22px',
        align: 'center',
    };

    return (
        <div className="blog-labs">
            <PageBanner image="http://oss.blog.memoyu.com/articles/banner/c683e041-e268-44b1-9076-023ce8230d5f.png" />
            <Container>
                <Divider {...dividerStyle}>
                    <IconConfig style={{ marginRight: 10, fontSize: 20 }} />
                    <Title heading={5}> 常用工具</Title>
                </Divider>

                <div className="blog-labs-tools">
                    <Tools />
                </div>

                <Divider {...dividerStyle}>
                    <IconToken style={{ marginRight: 10, fontSize: 20 }} />
                    <Title heading={5}> 开源项目</Title>
                </Divider>
                <div className="blog-labs-open-source">
                    <OpenSources />
                </div>
            </Container>
        </div>
    );
};

export default Index;
