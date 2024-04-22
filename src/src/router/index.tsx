import React, { lazy, FC } from 'react';
import { RouteObject } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { useRoutes } from 'react-router-dom';
import { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent, initTitleTick } from './config';
import Layout from '@components/layout';
import Empty from '@components/empty';

const Home = lazy(() => import('@pages/home'));
const Article = lazy(() => import('@pages/article'));
const ArticleDetail = lazy(() => import('@pages/article/detail'));

const Moment = lazy(() => import('@pages/moment'));

const Friend = lazy(() => import('@pages/friend'));

const Labs = lazy(() => import('@pages/labs'));
const LabsGitMoji = lazy(() => import('@pages/labs/components/git-moji'));

const About = lazy(() => import('@pages/about'));

const routeList: RouteObject[] = [
    {
        path: '/',
        element: <WrapperRouteComponent element={<Layout />} titleId="" auth />,
        children: [
            {
                path: '/',
                element: <WrapperRouteComponent element={<Home />} titleId="首页" auth />,
            },
            {
                path: 'article',
                element: <WrapperRouteComponent element={<Article />} titleId="文章" auth />,
            },
            {
                path: 'article/detail/:id',
                element: (
                    <WrapperRouteComponent element={<ArticleDetail />} titleId="文章详情" auth />
                ),
            },
            {
                path: 'moment',
                element: <WrapperRouteComponent element={<Moment />} titleId="动态" auth />,
            },
            {
                path: 'friend',
                element: <WrapperRouteComponent element={<Friend />} titleId="友链" auth />,
            },
            {
                path: 'labs',
                element: <WrapperRouteComponent element={<Labs />} titleId="实验室" auth />,
            },
            {
                path: 'about',
                element: <WrapperRouteComponent element={<About />} titleId="关于" auth />,
            },
            {
                path: 'git-moji',
                element: (
                    <WrapperRouteComponent element={<LabsGitMoji />} titleId="git-moji" auth />
                ),
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
    initTitleTick();
    return (
        <AnimatePresence mode="wait">
            {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
    );
};

export default RenderRouter;
