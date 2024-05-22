import React, { ReactNode } from 'react';
import { BackTop, Layout } from '@douyinfe/semi-ui';

import Header from './header';

import './index.scss';
import { IconArrowUp } from '@douyinfe/semi-icons';

const { Content } = Layout;

interface LayoutProps {
    children: ReactNode;
}

const Index: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Layout className="blog-layout">
            <Header />
            <Content className="blog-layout-content">{children}</Content>
            <BackTop className="blog-layout-backtop">
                <IconArrowUp />
            </BackTop>
        </Layout>
    );
};

export default Index;
