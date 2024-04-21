import { FC, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { PathRouteProps, useLocation } from 'react-router';

export interface WrapperRouteProps extends PathRouteProps {
    /** document title id */
    titleId: string;
    /** authorization？ */
    auth?: boolean;
}

let globalTitle = '';

const PublicRoute = (props: PathRouteProps) => {
    return props.element;
};

const PrivateRoute = (props: PathRouteProps) => {
    const location = useLocation();
    const { pathname } = location;

    //  return pathname === '/' ? <Navigate to={{ pathname: `/home` }} replace /> :
    return props.element;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, auth, ...props }) => {
    const WitchRoute = auth ? PrivateRoute : PublicRoute;
    if (titleId) {
        document.title = buildDocumentTitle(titleId);
    }
    return <WitchRoute {...props} />;
};

const WrapperRouteWithOutLayoutComponent: FC<WrapperRouteProps> = ({ titleId, ...props }) => {
    if (titleId) {
        document.title = buildDocumentTitle(titleId);
    }

    return <Suspense>{props.element}</Suspense>;
};

const buildDocumentTitle = (titleId: string) => {
    globalTitle = titleId == '首页' ? "memoyu's blog" : titleId + ' | memoyu的个人博客';
    return globalTitle;
};

// 会变的 title
const initTitleTick = () => {
    document.addEventListener('visibilitychange', function () {
        document.title = document.hidden ? '让我看看，怎么个事！' : globalTitle;
    });
};

export { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent, initTitleTick };
