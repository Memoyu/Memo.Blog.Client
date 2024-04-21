import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

import './index.scss';
import { Layout } from '@douyinfe/semi-ui';

const { Content } = Layout;

const Index: React.FC = () => {
    const contentProps = {
        id: 'blog-layout-content',
    };

    return (
        <Layout className="blog-layout" hasSider>
            <Header />
            <Content className="blog-layout-content" {...contentProps}>
                <motion.div
                    initial={{ scale: 1, opacity: 0, translateY: 0 }}
                    animate={{
                        opacity: [0, 0.5, 1],
                        translateY: [200, 100, 0],
                        transition: { type: 'spring', duration: 0.5, ease: 'easeInOut' },
                    }}
                    exit={{
                        scale: [1, 0.88, 0.88],
                        translateY: 100,
                        opacity: [1, 0.3, 0],
                        transformOrigin: ['center', 'bottom'],
                        transition: { duration: 0.8, ease: 'easeInOut' },
                    }}
                    //  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    {/* 包这层是为了让动画执行时缩放不受页面长度的影响 */}
                    {/* <div style={{ height: '100vh' }}>
                        <Suspense>
                            <Outlet />
                        </Suspense>
                    </div> */}

                    <Suspense>
                        <Outlet />
                    </Suspense>
                </motion.div>
            </Content>
        </Layout>
    );
};

export default Index;
