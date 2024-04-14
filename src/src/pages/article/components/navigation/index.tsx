import React, { useState } from 'react';
import MarkdownNavbar from 'markdown-navbar';

import 'markdown-navbar/dist/navbar.css';
import './index.scss';

interface Props {
    content?: string;
    setNavShow?: Function;
}

const Navigation: React.FC<Props> = ({ content, setNavShow }) => {
    const [navVisible, setNavVisible] = useState(true);

    return (
        <div className={navVisible ? 'article-detail-navbar' : 'article-detail-navbar-hide'}>
            <div
                className="article-detail-navbar-toggle-btn"
                onClick={() => {
                    setNavVisible(!navVisible);
                }}
            >
                {navVisible ? '→' : '←'}
            </div>
            <MarkdownNavbar
                source={content || ''}
                // headingTopOffset={15}
                // ordered={false}
                // updateHashAuto={false}
                //onNavItemClick={() => setNavShow?.(false)}
            />
        </div>
    );
};

export default Navigation;
