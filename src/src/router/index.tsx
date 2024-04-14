import { lazy, FC } from 'react';
import { RouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';
import { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent } from './config';
import Layout from '@components/layout';
import Empty from '@components/empty';

const routeList: RouteObject[] = [
    {
        path: '/',
        element: <WrapperRouteComponent element={<Layout />} titleId="" auth />,
        children: [],
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
    return element;
};

export default RenderRouter;
