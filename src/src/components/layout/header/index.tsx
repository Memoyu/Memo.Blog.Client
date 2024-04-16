import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '@components/logo';
import Container from '@components/layout/container';

import './index.scss';

type Item = {
    name: string;
    to: string;
};

const items: Array<Item> = [
    { name: '首页', to: '/home' },
    { name: '动态', to: '/moment' },
    { name: '友链', to: '/friend' },
    { name: '工具', to: '/tool' },
    { name: '关于', to: '/about' },
];

const CustHeader: FC = () => {
    let location = useLocation();
    let pathname = location.pathname || '/';
    if (pathname === '/404' || pathname === '/_not-found') pathname = '/';
    // console.log('p', pathname);
    return (
        <div className="header-navigation">
            <Container>
                <div className="header-navigation-inner">
                    <NavLink to="/" className="header-navigation-logo">
                        <Logo />
                    </NavLink>
                    <div className="header-navigation-list">
                        {items.map((item, index) => (
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

export default CustHeader;
