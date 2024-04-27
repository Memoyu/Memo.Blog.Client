import React, { ReactNode, Suspense } from 'react';
import { Layout } from '@douyinfe/semi-ui';

import Header from './header';

import './index.scss';

const { Content } = Layout;

interface LayoutProps {
    children: ReactNode;
}

const Index: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Layout className="blog-layout">
            <Header />
            <Content className="blog-layout-content">
                {/* <Suspense>
                    <Outlet />
                </Suspense> */}
                {children}
            </Content>
        </Layout>
    );
};

export default Index;
