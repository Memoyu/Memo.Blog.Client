import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';

import Header from './header';
import Footer from './footer';

import './index.scss';

const { Content } = Layout;

const Index: React.FC = () => {
    return (
        <Layout className="layout-page">
            <Header />
            <Content className="layout-content">
                <Suspense>
                    <Outlet />
                </Suspense>
            </Content>
            <Footer />
        </Layout>
    );
};

export default Index;
