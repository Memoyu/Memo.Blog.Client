import React, { lazy, FC } from 'react';
import { RouteObject } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useRoutes } from 'react-router-dom';
import { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent } from './config';
import Layout from '@components/layout';
import Empty from '@components/empty';

const Home = lazy(() => import('@src/pages/home'));
const Article = lazy(() => import('@src/pages/article'));
const GitMoji = lazy(() => import('@src/pages/tool/git-moji'));

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
    return (
        <AnimatePresence mode="wait" initial={false}>
            {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    );
};

export default RenderRouter;
