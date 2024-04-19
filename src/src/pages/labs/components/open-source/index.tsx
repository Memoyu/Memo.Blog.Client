import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { List, Card, Toast } from '@douyinfe/semi-ui';

import { useData } from '@src/hooks/useData';

import { OpenSourceProjectModel } from '@src/common/model';

import './index.scss';
import { openSourceProjectList } from '@src/utils/request';

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const headerHeight = 40;
    const footerHeight = 130;
    const footerOffset = 90;
    const [introVisible, setIntroVisible] = useState<boolean>(false);

    const [projects, loading, setProjects, setLoading] = useData<Array<OpenSourceProjectModel>>([]);

    const intro = {
        open: {
            translateY: 0,
        },
        closed: (direction: 'up' | 'down') => ({
            translateY: direction == 'up' ? footerOffset : -headerHeight,
        }),
    };

    const backgroundImage = {
        open: {
            scale: 0.9,
        },
        closed: {
            scale: 1,
        },
    };

    let getOpenSourceProjects = () => {
        setLoading(true);
        openSourceProjectList()
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }
                let items = projects ?? [];
                res.data.forEach((p) => {
                    if (items.findIndex((dp) => p.projectId == dp.projectId) < 0) {
                        items.push(p);
                    }
                });
                setProjects(items);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getOpenSourceProjects();
    }, []);

    return (
        <div className="com-open-source">
            <List
                grid={{
                    gutter: 12,
                }}
                loading={loading}
                layout="horizontal"
                dataSource={projects}
                renderItem={(item: OpenSourceProjectModel) => (
                    <List.Item>
                        <Card shadows="hover" style={{ width: 250 }} bodyStyle={{ padding: 0 }}>
                            <div
                                style={{
                                    height: 300,
                                    position: 'relative',
                                }}
                                onMouseOver={() => setIntroVisible(true)}
                                onMouseOut={() => setIntroVisible(false)}
                            >
                                <motion.div
                                    variants={backgroundImage}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundImage: `url(https://static.bh-lay.com/labs/vue-image-filler.jpg?imageView2/2/w/300/q/85)`,
                                    }}
                                    animate={introVisible ? 'open' : 'closed'}
                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                                />

                                <motion.div
                                    variants={intro}
                                    style={{
                                        height: headerHeight,
                                        backgroundColor: 'green',
                                        position: 'relative',
                                        zIndex: 99,
                                    }}
                                    initial={{ translateY: -headerHeight }}
                                    animate={introVisible ? 'open' : 'closed'}
                                    custom={'down'}
                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                                >
                                    头部
                                </motion.div>
                                <motion.div
                                    variants={intro}
                                    style={{
                                        height: footerHeight,
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        width: '100%',
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    initial={{ translateY: footerOffset }}
                                    animate={introVisible ? 'open' : 'closed'}
                                    custom={'up'}
                                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                                >
                                    {item.title}
                                </motion.div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Index;
