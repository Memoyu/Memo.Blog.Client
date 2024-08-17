import { FC } from 'react';
import { Image } from '@douyinfe/semi-ui';
import logo from '@assets/logo.png';

import './index.scss';

const Logo: FC = () => {
    return (
        <div className="blog-logo">
            <Image className="logo" preview={false} src={logo} />
        </div>
    );
};

export default Logo;
