import React, { lazy, FC } from 'react';
import { RouteObject } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useRoutes } from 'react-router-dom';
import { WrapperRouteComponent, initTitleTick } from './config';
import Layout from '@components/layout';
import Empty from '@components/empty';
import { PageIdEnum } from '@common/constant';

const Home = lazy(() => import('@pages/home'));

const Article = lazy(() => import('@pages/article'));
const ArticleDetail = lazy(() => import('@pages/article/detail'));

const Labs = lazy(() => import('@pages/labs'));

const Moment = lazy(() => import('@pages/moment'));

const About = lazy(() => import('@pages/about'));

const routeList: RouteObject[] = [
    {
        path: '/',
        element: <WrapperRouteComponent element={<Layout />} title="" />,
        children: [
            {
                path: '/',
                element: <WrapperRouteComponent element={<Home />} title="首页" />,
            },
            {
                path: 'article',
                element: <WrapperRouteComponent element={<Article />} title="文章" />,
            },
            {
                path: 'article/detail/:id',
                element: <WrapperRouteComponent element={<ArticleDetail />} title="文章详情" />,
            },
            {
                path: 'moment',
                element: <WrapperRouteComponent element={<Moment />} title="动态" />,
            },
            {
                path: 'labs',
                element: <WrapperRouteComponent element={<Labs />} title="实验室" />,
            },
            {
                path: 'about',
                element: <WrapperRouteComponent element={<About />} title="关于" />,
            },
        ],
    },
    {
        path: '*',
        element: (
            <WrapperRouteComponent
                element={<Empty title="找不到咯" description="这里什么也没有~" type="404" />}
                title="404"
            />
        ),
    },
];

const RenderRouter: FC = () => {
    const element = useRoutes(routeList);
    if (element == null) return <></>;
    initTitleTick();
    return (
        <AnimatePresence mode="wait">
            {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    );
};

export default RenderRouter;
