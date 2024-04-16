import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

import './index.scss';

const Index: React.FC = () => {
    return (
        <div className="blog-layout">
            <Header />

            <div className="blog-layout-content">
                <motion.div
                    initial={{ scale: 1, opacity: 0, translateY: 0 }}
                    animate={{
                        opacity: [0, 0.5, 1],
                        translateY: [200, 100, 0],
                        transition: { type: 'spring', duration: 0.8, ease: 'easeInOut' },
                    }}
                    exit={{
                        scale: [1, 0.88, 0.88],
                        opacity: [1, 0.5, 0],
                        transformOrigin: ['center', 'bottom'],
                        transition: { duration: 1, ease: 'easeInOut' },
                    }}
                    //  transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </motion.div>
            </div>
        </div>
    );
};

export default Index;
