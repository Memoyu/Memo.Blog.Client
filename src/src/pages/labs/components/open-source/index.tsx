import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';

import './index.scss';
import { Card } from '@douyinfe/semi-ui';

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const headerHeight = 40;
    const footerHeight = 130;
    const footerOffset = 90;
    const [visible, setVisible] = useState<boolean>(false);
    const [mar, setMar] = useState<number>(-10);
    const detail = {
        open: {
            translateY: 0,
        },
        closed: (direction: 'up' | 'down') => ({
            translateY: direction == 'up' ? footerOffset : -headerHeight,
        }),
    };

    return (
        <div style={{ height: 500 }}>
            <Card shadows="always" style={{ width: 250 }} bodyStyle={{ padding: 0 }}>
                <div
                    style={{
                        height: 300,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                    onMouseOver={() => setVisible(true)}
                    onMouseOut={() => setVisible(false)}
                >
                    <motion.div
                        style={{
                            height: headerHeight,
                            backgroundColor: 'antiquewhite',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                        }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        底层图片
                    </motion.div>

                    <motion.div
                        variants={detail}
                        style={{ height: headerHeight, backgroundColor: 'green' }}
                        animate={visible ? 'open' : 'closed'}
                        custom={'down'}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        头部
                    </motion.div>
                    <motion.div
                        variants={detail}
                        style={{
                            height: footerHeight,
                            position: 'absolute',
                            width: '100%',
                            right: 0,
                            bottom: 0,
                        }}
                        animate={visible ? 'open' : 'closed'}
                        custom={'up'}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                    >
                        底部
                    </motion.div>
                </div>
            </Card>
        </div>
    );
};

export default Index;
