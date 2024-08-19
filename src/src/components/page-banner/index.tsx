import { CSSProperties, FC, ReactNode, useEffect } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Typography } from '@douyinfe/semi-ui';

import { BannerInfoModel } from '@src/common/model';

interface ComProps {
    style?: CSSProperties;
    banner?: BannerInfoModel;
    showOrigin?: boolean;
    height?: number | string;
    children?: ReactNode;
}

const { Text } = Typography;

const Index: FC<ComProps> = ({ style, banner, showOrigin = true, height = 300, children }) => {
    useEffect(() => {}, [banner]);

    return (
        <div className="page-banner-outer">
            <div
                className="page-banner zoom-show"
                style={{ ...style, height: height, backgroundImage: `url(${banner?.url})` }}
            >
                {children}
            </div>

            {showOrigin && (
                <Link
                    target="_blank"
                    to={banner?.originUrl ? banner?.originUrl : ''}
                    className="banner-origin"
                >
                    <Text className="banner-origin-title" strong type="secondary">
                        {banner?.title}
                    </Text>
                </Link>
            )}
        </div>
    );
};

export default Index;
