import React, { FC, ReactNode, useEffect } from 'react';
import { Image } from '@douyinfe/semi-ui';

import './index.scss';

interface ComProps {
    image: string;
    children?: ReactNode;
}

const Index: FC<ComProps> = ({ image, children }) => {
    useEffect(() => {}, [image]);

    return (
        <div className="page-banner-outer">
            <div className="page-banner zoom-show" style={{ backgroundImage: `url(${image})` }}>
                {children}
            </div>
        </div>
    );
};

export default Index;
