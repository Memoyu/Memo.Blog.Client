import { CSSProperties, FC, ReactNode, useEffect } from 'react';

import './index.scss';

interface ComProps {
    style?: CSSProperties;
    image?: string;
    height?: number | string;
    children?: ReactNode;
}

const Index: FC<ComProps> = ({ style, image, height = 300, children }) => {
    useEffect(() => {}, [image]);

    return (
        <div className="page-banner-outer">
            <div
                className="page-banner zoom-show"
                style={{ ...style, height: height, backgroundImage: `url(${image})` }}
            >
                {children}
            </div>
        </div>
    );
};

export default Index;
