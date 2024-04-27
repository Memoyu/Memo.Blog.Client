import React, { useState } from 'react';
import MarkdownNavbar from 'markdown-navbar';

import 'markdown-navbar/dist/navbar.css';
import './index.scss';

interface Props {
    content?: string;
}

const Navigation: React.FC<Props> = ({ content }) => {
    const [navVisible, setNavVisible] = useState(true);

    return (
        <div className={navVisible ? 'markdown-nav' : 'markdown-nav markdown-nav-hide'}>
            <div
                className="markdown-nav-toggle-btn"
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
                // onNavItemClick={() => setNavShow?.(false)}
            />
        </div>
    );
};

export default Navigation;
