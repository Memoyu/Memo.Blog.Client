import React, { FC, ReactNode, useEffect } from 'react';
import { Image } from '@douyinfe/semi-ui';

import './index.scss';

interface ComProps {
    image?: string;
    height?: number | string;
    children?: ReactNode;
}

const Index: FC<ComProps> = ({ image, height = 300, children }) => {
    useEffect(() => {}, [image]);

    return (
        <div className="page-banner-outer">
            <div
                className="page-banner zoom-show"
                style={{ height: height, backgroundImage: `url(${image})` }}
            >
                {children}
            </div>
        </div>
    );
};

export default Index;
