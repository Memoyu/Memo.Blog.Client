import React, { Suspense, useEffect } from 'react';
import { motion, useIsPresent } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';

import Header from './header';

import { BLOG_LAYOUT_CONTENT_ID } from '@src/common/constant';

import './index.scss';

const { Content } = Layout;

const Index: React.FC = () => {
    const isPresent = useIsPresent();

    const contentProps = {
        id: BLOG_LAYOUT_CONTENT_ID,
    };
    const contentMotionProps = {
        id: 'blog-layout-content-motion',
    };

    useEffect(() => {
        if (!isPresent) {
            // console.log('组件移除');
            let motionEl = document.getElementById(contentMotionProps.id);
            if (motionEl) {
                let top = getScrollTop();
                // console.log('组件移除', top);
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
        return document.getElementById(contentProps.id)?.scrollTop ?? 0;
    };

    return (
        <Layout className="blog-layout" hasSider>
            <Header />
            <Content className="blog-layout-content" {...contentProps}>
                <motion.div
                    {...contentMotionProps}
                    initial={{ scale: 1, opacity: 0, translateY: 200 }}
                    animate={{
                        opacity: [0, 0.5, 1],
                        translateY: [200, 100, 0],
                        transition: { type: 'spring', duration: 0.5, ease: 'easeInOut' },
                    }}
                    exit={{
                        scale: [1, 0.8, 0.8],
                        opacity: [1, 0.4, 0],
                        transformOrigin: ['center', 'bottom'],
                        transition: { duration: 0.8, ease: 'easeInOut' },
                    }}
                    //  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </motion.div>
            </Content>
        </Layout>
    );
};

export default Index;
