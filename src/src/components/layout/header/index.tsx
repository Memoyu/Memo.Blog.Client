import { FC, useEffect, useState } from 'react';
import { Button, Dropdown } from '@douyinfe/semi-ui';
import { IconMenu, IconMoon, IconSun } from '@douyinfe/semi-icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Logo from '@components/logo';
import ContentContainer from '@src/components/layout/content-container';

import { IScrollProps, useContentScroll } from '@src/hooks/useContentScroll';

import { getLocalStorage, setLocalStorage } from '@src/utils/storage';

import { THEME_MODE } from '@common/constant';

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

const body = document.body;

const Index: FC<ComProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const [isLight, setIsLight] = useState<boolean>(false);
    const [mode, setMode] = useState<string>(getLocalStorage(THEME_MODE) || 'light');

    let pathname = location.pathname || '/';
    if (pathname === '/404' || pathname === '/_not-found') pathname = '/';

    // 切换主题
    const switchMode = () => {
        let theme = mode == 'light' ? 'dark' : 'light';
        setThemeMode(theme);
    };

    // 设置主题mode
    const setThemeMode = (mode: string) => {
        if (mode == 'light') {
            body.removeAttribute(THEME_MODE);
        } else {
            body.setAttribute(THEME_MODE, mode);
        }

        setIsLight(mode == 'light');
        setMode(mode);
        setLocalStorage(THEME_MODE, mode);
    };

    const handleDropdownItemClick = (item: NavItem) => {
        navigate(item.to);
    };

    useEffect(() => {
        setThemeMode(mode);
    }, []);

    useContentScroll((props: IScrollProps) => {
        // console.log('滚动事件触发', props);
        let isScroll = props.scrollTop > 50;
        setIsScrolling(isScroll);
    });

    return (
        <div className={`blog-header ${isScrolling ? 'stick' : ''}`}>
            <ContentContainer>
                <div className="blog-header-wrap">
                    <NavLink to="/" className="blog-header-logo">
                        <Logo />
                    </NavLink>
                    <div className="blog-header-nav">
                        <div className="nav-list-wrap">
                            {navs.map((item, index) => (
                                <NavLink to={item.to} key={index} className="blog-header-navs-item">
                                    {item.name}
                                    {item.to === pathname && (
                                        <motion.div
                                            className="blog-header-navs-item-active"
                                            layoutId="bar"
                                            aria-hidden={true}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 350,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </NavLink>
                            ))}
                        </div>
                        <div className="nav-dropdown-wrap">
                            <Dropdown
                                trigger="click"
                                autoAdjustOverflow={false}
                                clickToHide
                                render={
                                    <Dropdown.Menu className="nav-dropdown-menu-wrap">
                                        {navs.map((item, index) => (
                                            <Dropdown.Item
                                                type="primary"
                                                key={index}
                                                active={item.to === pathname}
                                                onClick={() => handleDropdownItemClick(item)}
                                            >
                                                {item.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                }
                            >
                                <Button theme="borderless" icon={<IconMenu />}></Button>
                            </Dropdown>
                        </div>
                        <Button
                            className="blog-header-theme"
                            theme="borderless"
                            icon={isLight ? <IconMoon /> : <IconSun />}
                            onClick={switchMode}
                        />
                    </div>
                </div>
            </ContentContainer>
        </div>
    );
};

export default Index;
