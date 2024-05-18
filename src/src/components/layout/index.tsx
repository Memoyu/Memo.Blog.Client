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
    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        borderRadius: '100%',
        backgroundColor: 'var(--semi-color-primary)',
        color: 'var(--semi-color-text-0)',
        right: 50,
        bottom: 40,
    };

    return (
        <Layout className="blog-layout">
            <Header />
            <Content className="blog-layout-content">
                {/* <Suspense>
                    <Outlet />
                </Suspense> */}
                {children}
            </Content>
            <BackTop style={style}>
                <IconArrowUp />
            </BackTop>
        </Layout>
    );
};

export default Index;
