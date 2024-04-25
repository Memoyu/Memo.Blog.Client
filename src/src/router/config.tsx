import { FC } from 'react';
import { PathRouteProps } from 'react-router';

export interface WrapperRouteProps extends PathRouteProps {
    title: string;
}

let globalTitle = '';

const WitchRoute = (props: PathRouteProps) => {
    return props.element;
};

const buildDocumentTitle = (titleId: string) => {
    globalTitle = titleId == '首页' ? "memoyu's blog" : titleId + ' | memoyu的个人博客';
    return globalTitle;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = (props) => {
    let title = props.title;
    if (title) {
        document.title = buildDocumentTitle(title);
    }

    return <WitchRoute {...props} />;
};

// 会变的 title
const initTitleTick = () => {
    document.addEventListener('visibilitychange', function () {
        document.title = document.hidden ? '让我看看，怎么个事！' : globalTitle;
    });
};

export { WrapperRouteComponent, initTitleTick };
