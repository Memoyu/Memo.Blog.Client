import React, { FC } from 'react';
import { RouteObject } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useLocation, useRoutes } from 'react-router-dom';
import { WrapperRouteComponent, initTitleTick } from './config';
import Empty from '@components/empty';

import Home from '@pages/home';

import Article from '@pages/article';
import ArticleDetail from '@pages/article/detail';

import Labs from '@pages/labs';

import Moment from '@pages/moment';

import About from '@pages/about';

const routeList: RouteObject[] = [
    {
        path: '/',
        element: <WrapperRouteComponent element={<Home />} title="首页" />,
    },
    {
        path: '/article/*',
        element: <WrapperRouteComponent element={<Article />} title="文章" />,
    },
    {
        path: '/article/detail/:id',
        element: <WrapperRouteComponent element={<ArticleDetail />} title="文章详情" />,
    },
    {
        path: '/moment',
        element: <WrapperRouteComponent element={<Moment />} title="动态" />,
    },
    {
        path: '/labs',
        element: <WrapperRouteComponent element={<Labs />} title="实验室" />,
    },
    {
        path: '/about',
        element: <WrapperRouteComponent element={<About />} title="关于" />,
    },
    {
        path: '*',
        element: (
            <WrapperRouteComponent
                element={<Empty title="找不到咯" description="这里什么也没有~" />}
                title="404"
            />
        ),
    },
];

const RenderRouter: FC = () => {
    const element = useRoutes(routeList);
    const location = useLocation();
    if (!element) return null;
    initTitleTick();
    return (
        <AnimatePresence initial={false}>
            {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    );
};

export default RenderRouter;
