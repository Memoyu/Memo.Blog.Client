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

const Index: FC<HeaderProps> = ({ icon, title, children }) => {
    const isPresent = useIsPresent();
    return (
        <Layout className="page-content-container">
            <div className="page-header">
                {icon && React.cloneElement(icon, { size: 'extra-large', key: 'extra-large' })}
                {title && (
                    <Title style={{ marginLeft: 10 }} heading={2}>
                        {title}
                    </Title>
                )}
            </div>
            <div className="page-content">{children}</div>
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0, transition: { duration: 0.5, ease: 'circOut' } }}
                exit={{ scaleX: 1, transition: { duration: 0.5, ease: 'circIn' } }}
                style={{ originX: isPresent ? 0 : 1 }}
                className="privacy-screen"
            />
        </Layout>
    );
};

export default Index;
