import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { throttle } from 'lodash';

import Logo from '@components/logo';
import Container from '@components/layout/container';

import './index.scss';

type NavItem = {
    name: string;
    to: string;
};

interface ComProps {}

const navs: Array<NavItem> = [
    { name: '首页', to: '/' },
    { name: '文章', to: '/article' },
    { name: '实验室', to: '/labs' },
    { name: '动态', to: '/moment' },
    { name: '关于', to: '/about' },
];

const Index: FC<ComProps> = () => {
    let location = useLocation();
    let [isScrolling, setIsScrolling] = useState<boolean>(false);

    let pathname = location.pathname || '/';
    if (pathname === '/404' || pathname === '/_not-found') pathname = '/';

    const handleScroll = () => {
        ajustNavigation();
    };

    // 使用节流
    const throttledScrollHandler = throttle(handleScroll, 200);

    const ajustNavigation = () => {
        let scrollTop =
            getContentEle()?.scrollTop ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        let isScroll = scrollTop > 50;
        // console.log('滚动事件触发', scrollTop, isScroll);
        setIsScrolling(isScroll);
    };

    const getContentEle = () => document.getElementById('blog-layout-content');

    useEffect(() => {
        let contentEle = getContentEle();
        contentEle?.addEventListener('scroll', throttledScrollHandler);

        return () => {
            contentEle?.removeEventListener('scroll', throttledScrollHandler);
        };
    }, []);

    return (
        <div className={`header-navigation ${isScrolling ? 'stick' : ''}`}>
            <Container>
                <div className="header-navigation-inner">
                    <NavLink to="/" className="header-navigation-logo">
                        <Logo />
                    </NavLink>
                    <div className="header-navigation-list">
                        {navs.map((item, index) => (
                            <NavLink
                                to={item.to}
                                key={index}
                                className="header-navigation-list-item"
                            >
                                {item.name}
                                {item.to === pathname && (
                                    <motion.div
                                        className="blog-header-nav-active"
                                        layoutId="bar"
                                        aria-hidden={true}
                                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Index;
