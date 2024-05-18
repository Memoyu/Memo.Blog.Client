import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IconBranch, IconStar } from '@douyinfe/semi-icons';
import { List, Card, Toast, Avatar, Typography, Space, Modal, Divider } from '@douyinfe/semi-ui';

import { useData } from '@src/hooks/useData';

import { OpenSourceProjectModel } from '@src/common/model';

import './index.scss';
import { getByUrl, openSourceProjectList } from '@src/utils/request';
import MarkDown from '@src/components/markdown/article';

interface ComProps {}

const { Text, Title } = Typography;

const Index: FC<ComProps> = ({}) => {
    const headerHeight = 40;
    const footerHeight = 130;
    const footerOffset = 80;
    const [hoverProject, setHoverProject] = useState<OpenSourceProjectModel>();
    const [projects, loading, setProjects, setLoading] = useData<Array<OpenSourceProjectModel>>([]);

    const [projectDetailVisible, setProjectDetailVisible] = useState<boolean>(false);
    const [modalProject, setModalProject] = useState<OpenSourceProjectModel>();
    const [readmeContent, setReadmeContent] = useState<string>();

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

    const transition = { duration: 0.7, ease: 'easeInOut' };

    // 获取开源项目列表
    const getOpenSourceList = () => {
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
        getOpenSourceList();
    }, []);

    const handleProjectClick = (item: OpenSourceProjectModel) => {
        setModalProject(item);
        setProjectDetailVisible(true);

        getByUrl(item.readmeUrl).then((res) => {
            // console.log(res);
            if (res.status == 200) {
                // console.log(res.data);

                setReadmeContent(res.data);
            }
        });
    };

    return (
        <div className="com-open-source">
            <List
                grid={{
                    gutter: 20,
                    justify: 'center',
                }}
                loading={loading}
                layout="horizontal"
                dataSource={projects}
                renderItem={(item: OpenSourceProjectModel) => (
                    <List.Item>
                        <Card
                            shadows="hover"
                            style={{ marginTop: 15, width: 245, borderRadius: 'unset' }}
                            bodyStyle={{ padding: 0, backgroundColor: 'rgb(var(--semi-grey-0))' }}
                        >
                            <div
                                style={{
                                    height: 300,
                                    position: 'relative',
                                }}
                                onMouseOver={() => setHoverProject(item)}
                                onMouseOut={() => setHoverProject(undefined)}
                                onClick={() => handleProjectClick(item)}
                            >
                                {/* 背景 */}
                                <motion.div
                                    variants={backgroundImage}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundImage: `url(${item.imageUrl})`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    animate={
                                        item.projectId == hoverProject?.projectId
                                            ? 'open'
                                            : 'closed'
                                    }
                                    transition={transition}
                                >
                                    {item.imageUrl.length <= 0 && (
                                        <Avatar
                                            size="extra-large"
                                            style={{
                                                margin: 4,
                                                backgroundColor: 'rgba(var(--semi-violet-0))',
                                            }}
                                        >
                                            {item.title.substring(0, 2)}
                                        </Avatar>
                                    )}
                                </motion.div>

                                {/* 头部 */}
                                <motion.div
                                    variants={intro}
                                    style={{
                                        height: headerHeight,
                                        backgroundColor: 'rgb(var(--semi-grey-0))',
                                        position: 'relative',
                                        zIndex: 99,
                                    }}
                                    initial={{ translateY: -headerHeight }}
                                    animate={
                                        item.projectId == hoverProject?.projectId
                                            ? 'open'
                                            : 'closed'
                                    }
                                    custom={'down'}
                                    transition={transition}
                                >
                                    <div
                                        style={{
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: '0 20px',
                                        }}
                                    >
                                        <Space>
                                            <IconStar />
                                            <Text strong>{item.star}</Text>
                                        </Space>
                                        <Space style={{ marginLeft: 20 }}>
                                            <IconBranch />
                                            <Text strong>{item.fork}</Text>
                                        </Space>
                                    </div>
                                </motion.div>

                                {/* 底部 */}
                                <motion.div
                                    variants={intro}
                                    style={{
                                        height: footerHeight,
                                        backgroundColor: 'rgb(var(--semi-grey-0))',
                                        position: 'absolute',
                                        width: '100%',
                                        right: 0,
                                        bottom: 0,
                                    }}
                                    initial={{ translateY: footerOffset }}
                                    animate={
                                        item.projectId == hoverProject?.projectId
                                            ? 'open'
                                            : 'closed'
                                    }
                                    custom={'up'}
                                    transition={transition}
                                >
                                    <div style={{ margin: '0 15px' }}>
                                        <div
                                            style={{
                                                height: footerHeight - footerOffset,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text strong>{item.title}</Text>
                                        </div>
                                        <div>
                                            <Text
                                                ellipsis={{
                                                    rows: 3,
                                                    showTooltip: {
                                                        type: 'popover',
                                                        opts: { style: { width: 300 } },
                                                    },
                                                }}
                                                type="tertiary"
                                            >
                                                {item.description}
                                            </Text>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title={modalProject?.title}
                visible={projectDetailVisible}
                onCancel={() => {
                    setProjectDetailVisible(false);
                    setReadmeContent('');
                }}
                centered
                bodyStyle={{
                    margin: '20px 0',
                    height: 'calc(100vh - 200px)', // 动态高度
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
                style={{ width: 1200 }}
                header={undefined}
                footer={undefined}
            >
                <Title style={{ textAlign: 'center', marginTop: 30 }}>{modalProject?.title}</Title>
                <div style={{ marginTop: 10, marginBottom: 25, textAlign: 'center' }}>
                    <a href={modalProject?.htmlUrl ?? ''} target="_blank">
                        <Text>{modalProject?.htmlUrl ?? ''}</Text>
                    </a>
                </div>
                <Divider align="center">项目简介</Divider>
                <MarkDown content={readmeContent} />
            </Modal>
        </div>
    );
};

export default Index;
