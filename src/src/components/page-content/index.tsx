import React, { FC, ReactNode, ReactElement } from 'react';
import { motion, useIsPresent } from 'framer-motion';
import { Layout, Typography } from '@douyinfe/semi-ui';

import './index.scss';

const { Title } = Typography;

interface HeaderProps {
    icon?: ReactElement;
    title?: string;
    children: ReactNode;
}

const Index: FC<HeaderProps> = ({ children }) => {
    return <div className="blog-page-content">{children}</div>;
};

export default Index;
