import { FC, useEffect } from 'react';
import { PathRouteProps } from 'react-router';
import { motion, useIsPresent } from 'framer-motion';

export interface WrapperRouteProps extends PathRouteProps {
    title: string;
    withaAnimate?: boolean;
}

let globalTitle = '';

const DefaultRoute = (props: PathRouteProps) => {
    return props.element;
};

const AnimateRoute = (props: PathRouteProps) => {
    const isPresent = useIsPresent();

    const contentWrapProps = {
        id: 'blog-layout-content-wrap',
        // 测试用
        // style: { backgroundColor: 'red' },
    };

    useEffect(() => {
        if (!isPresent) {
            // console.log('组件移除');
            let wrap = document.getElementById(contentWrapProps.id);
            if (wrap) {
                let top = getScrollTop();
                // console.log('组件移除', top, wrap);
                window.scrollTo(0, 0);
                wrap.style.position = 'absolute';
                wrap.style.top = '0px';
                wrap.style.left = '0px';
                wrap.style.width = '100%';
                wrap.style.height = '100vh';
                wrap.style.overflow = 'hidden';
                wrap.scrollTop = top;
            }
        } else {
            // console.log('组件创建');
        }
    }, [isPresent]);

    const getScrollTop = () => {
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    };

    return (
        <motion.div
            {...contentWrapProps}
            animate={{
                opacity: [0, 0, 1],
                y: 0,
                translateY: [200, 200, 0],
                transition: { duration: 1.2, ease: 'easeInOut' },
            }}
            exit={{
                scale: [1, 0.88, 0.88],
                opacity: [1, 0.7, 0],
                transformOrigin: ['center', 'bottom'],
                transition: { duration: 1, ease: 'easeInOut' },
            }}
            style={{ minHeight: '100vh' }}
            //  transition={{ duration: 1, ease: 'easeInOut' }}
        >
            {props.element}
        </motion.div>
    );
};

const buildDocumentTitle = (titleId: string) => {
    globalTitle = titleId == '首页' ? "memoyu's blog" : titleId + ' | memoyu的个人博客';
    return globalTitle;
};

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ withaAnimate = true, ...props }) => {
    const WitchRoute = withaAnimate ? AnimateRoute : DefaultRoute;

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
