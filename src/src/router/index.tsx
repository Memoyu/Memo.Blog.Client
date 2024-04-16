import React, { lazy, FC } from 'react';
import { RouteObject } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useRoutes } from 'react-router-dom';
import { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent } from './config';
import Layout from '@components/layout';
import Empty from '@components/empty';

const Home = lazy(() => import('@src/pages/home'));
const Article = lazy(() => import('@src/pages/article'));

const Moment = lazy(() => import('@src/pages/moment'));

const Friend = lazy(() => import('@src/pages/friend'));

const Tool = lazy(() => import('@src/pages/tool'));
const GitMoji = lazy(() => import('@src/pages/tool/git-moji'));

const About = lazy(() => import('@src/pages/about'));

const routeList: RouteObject[] = [
    {
        path: '/',
        element: <WrapperRouteComponent element={<Layout />} titleId="" auth />,
        children: [
            {
                path: 'home',
                element: <WrapperRouteComponent element={<Home />} titleId="首页" auth />,
            },
            {
                path: 'article',
                element: <WrapperRouteComponent element={<Article />} titleId="文章" auth />,
            },
            {
                path: 'moment',
                element: <WrapperRouteComponent element={<Moment />} titleId="动态" auth />,
            },
            {
                path: 'friend',
                element: <WrapperRouteComponent element={<Friend />} titleId="动态" auth />,
            },
            {
                path: 'tool',
                element: <WrapperRouteComponent element={<Tool />} titleId="工具" auth />,
            },
            {
                path: 'about',
                element: <WrapperRouteComponent element={<About />} titleId="关于" auth />,
            },
            {
                path: 'git-moji',
                element: <WrapperRouteComponent element={<GitMoji />} titleId="git-moji" auth />,
            },
        ],
    },
    {
        path: '*',
        element: (
            <WrapperRouteWithOutLayoutComponent
                element={<Empty title="找不到咯" description="这里什么也没有~" type="404" />}
                titleId="404"
            />
        ),
    },
];

const RenderRouter: FC = () => {
    const element = useRoutes(routeList);
    if (element == null) return <></>;
    return (
        <AnimatePresence mode="wait">
            {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    );
};

export default RenderRouter;
