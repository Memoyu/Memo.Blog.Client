import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from '@components/logo';
import ContentContainer from '@src/components/layout/content-container';

import { IScrollProps, useContentScroll } from '@src/hooks/useContentScroll';

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

    useEffect(() => {}, []);

    useContentScroll((props: IScrollProps) => {
        // console.log('滚动事件触发', props);
        let isScroll = props.scrollTop > 50;
        setIsScrolling(isScroll);
    });

    return (
        <div className={`header-navigation ${isScrolling ? 'stick' : ''}`}>
            <ContentContainer>
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
            </ContentContainer>
        </div>
    );
};

export default Index;
