import { FC, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { PathRouteProps, useLocation } from 'react-router';

export interface WrapperRouteProps extends PathRouteProps {
    /** document title id */
    titleId: string;
    /** authorization？ */
    auth?: boolean;
}

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
        document.title = titleId;
    }
    return <WitchRoute {...props} />;
};

const WrapperRouteWithOutLayoutComponent: FC<WrapperRouteProps> = ({ titleId, ...props }) => {
    if (titleId) {
        document.title = titleId;
    }

    return <Suspense>{props.element}</Suspense>;
};

export { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent };
