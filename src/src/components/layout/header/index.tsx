import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Layout } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';

import './index.scss';

const { Header } = Layout;

type Item = {
    name: string;
    to: string;
};

const items: Array<Item> = [
    { name: '首页', to: '/' },
    { name: '时间轴', to: '/timeline' },
    { name: '友链', to: '/link' },
    { name: '工具', to: '/tool' },
    { name: '关于', to: '/about' },
];

const CustHeader: FC = () => {
    let location = useLocation();
    let pathname = location.pathname || '/';
    if (pathname === '/404' || pathname === '/_not-found') pathname = '/';
    // console.log('p', pathname);
    return (
        <Header style={{ background: 'none' }} className="blog-header">
            <div className="blog-header-nav">
                {items.map((item, index) => (
                    <NavLink to={item.to} key={index}>
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
        </Header>
    );
};

export default CustHeader;
