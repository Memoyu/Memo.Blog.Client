import React, { Suspense, useEffect } from 'react';
import { motion, useIsPresent } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';

import Header from './header';
import Footer from './footer';

import './index.scss';

const { Content } = Layout;

const Index: React.FC = () => {
    const isPresent = useIsPresent();

    const contentMotionProps = {
        id: 'blog-layout-content-motion',
    };

    useEffect(() => {
        if (!isPresent) {
            // console.log('组件移除');
            let motionEl = document.getElementById(contentMotionProps.id);
            if (motionEl) {
                let top = getScrollTop();
                //  console.log('组件移除', top);
                window.scrollTo(0, 0);
                motionEl.style.position = 'absolute';
                motionEl.style.top = '0px';
                motionEl.style.left = '0px';
                motionEl.style.width = '100%';
                motionEl.style.height = '100vh';
                motionEl.style.overflow = 'hidden';
                motionEl.scrollTop = top;
            }
        } else {
            // console.log('组件创建');
        }
    }, [isPresent]);

    const getScrollTop = () => {
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    };

    return (
        <Layout className="blog-layout">
            <Header />
            <motion.div
                {...contentMotionProps}
                //  initial={{ opacity: 0, translateY: 200 }}
                animate={{
                    opacity: [0, 0, 1],
                    translateY: [200, 200, 0],
                    transition: { duration: 1.2, ease: 'easeInOut' },
                }}
                exit={{
                    scale: [1, 0.88, 0.88],
                    //opacity: [1, 0.8, 0],
                    transformOrigin: ['center', 'bottom'],
                    transition: { duration: 0.8, ease: 'easeInOut' },
                }}
                //  transition={{ duration: 1, ease: 'easeInOut' }}
            >
                <Content className="blog-layout-content">
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </Content>
            </motion.div>
        </Layout>
    );
};

export default Index;
