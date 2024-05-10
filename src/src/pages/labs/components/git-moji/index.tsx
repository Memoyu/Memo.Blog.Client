import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { List, Button, Modal, Toast, Typography, Card } from '@douyinfe/semi-ui';

import './index.scss';

const { Text } = Typography;

interface ComProps {
    visible?: boolean;
    onChange?: (visible: boolean) => void;
}

interface GitmojiProps {
    id: number;
    code?: string;
    emoji?: string;
    color?: string;
    description?: string;
}

const emojis: Array<GitmojiProps> = [
    { id: 1, code: ':art:', emoji: '🎨', color: '#ff7281', description: '结构改进 / 格式化代码。' },
    { id: 2, code: ':zap:', emoji: '⚡️', color: '#40c4ff', description: '性能改善。' },
    { id: 3, code: ':fire:', emoji: '🔥', color: '#ff9d44', description: '删除代码或者文件。' },
    { id: 4, code: ':bug:', emoji: '🐛', color: '#8cd842', description: '修了一个 BUG。' },
    { id: 5, code: ':ambulance:', emoji: '🚑️', color: '#fb584a', description: '重大热修复。' },
    { id: 6, code: ':sparkles:', emoji: '✨', color: '#ffe55f', description: '引入新的特性。' },
    { id: 7, code: ':memo:', emoji: '📝', color: '#00e676', description: '添加或更新文档。' },
    { id: 8, code: ':rocket:', emoji: '🚀', color: '#00a9f0', description: '部署相关。' },
    {
        id: 9,
        code: ':lipstick:',
        emoji: '💄',
        color: '#80deea',
        description: '更新界面与样式文件。',
    },
    { id: 10, code: ':tada:', emoji: '🎉', color: '#f74d5f', description: '创世提交。' },
    {
        id: 11,
        code: ':white_check_mark:',
        emoji: '✅',
        color: '#77e856',
        description: '更新测试。',
    },
    { id: 12, code: ':lock:', emoji: '🔒️', color: '#ffce49', description: '修复安全问题。' },
    {
        id: 13,
        code: ':closed_lock_with_key:',
        emoji: '🔐',
        color: '#83beec',
        description: '添加或更新密钥。',
    },
    { id: 14, code: ':bookmark:', emoji: '🔖', color: '#80deea', description: '发布 / 版本标签' },
    {
        id: 15,
        code: ':rotating_light:',
        emoji: '🚨',
        color: '#536dfe',
        description: '消除 linter 警告。',
    },
    { id: 16, code: ':construction:', emoji: '🚧', color: '#ffb74d', description: '进行中。' },
    {
        id: 17,
        code: ':green_heart:',
        emoji: '💚',
        color: '#c5e763',
        description: '修复持续集成构建。',
    },
    { id: 18, code: ':arrow_down:', emoji: '⬇️', color: '#ef5350', description: '降级依赖。' },
    { id: 19, code: ':arrow_up:', emoji: '⬆️', color: '#00e676', description: '升级依赖。' },
    {
        id: 20,
        code: ':pushpin:',
        emoji: '📌',
        color: '#39c2f1',
        description: '固定依赖在特定的版本。',
    },
    {
        id: 21,
        code: ':construction_worker:',
        emoji: '👷',
        color: '#64b5f6',
        description: '添加持续集成构建系统。',
    },
    {
        id: 22,
        code: ':chart_with_upwards_trend:',
        emoji: '📈',
        color: '#cedae6',
        description: '添加分析或者跟踪代码。',
    },
    { id: 23, code: ':recycle:', emoji: '♻️', color: '#77e856', description: '代码重构。' },
    { id: 24, code: ':heavy_plus_sign:', emoji: '➕', color: '#00e676', description: '添加依赖。' },
    {
        id: 25,
        code: ':heavy_minus_sign:',
        emoji: '➖',
        color: '#ef5350',
        description: '删除依赖。',
    },
    { id: 26, code: ':wrench:', emoji: '🔧', color: '#ffc400', description: '改变配置文件。' },
    {
        id: 27,
        code: ':hammer:',
        emoji: '🔨',
        color: '#ffc400',
        description: '添加或更新开发脚本。',
    },
    {
        id: 28,
        code: ':globe_with_meridians:',
        emoji: '🌐',
        color: '#e7f4ff',
        description: '国际化与本地化。',
    },
    { id: 29, code: ':pencil2:', emoji: '✏️', color: '#ffce49', description: '修正拼写错误。' },
    { id: 30, code: ':poop:', emoji: '💩', color: '#a78674', description: '写需要改进的坏代码。' },
    { id: 31, code: ':rewind:', emoji: '⏪️', color: '#56d1d8', description: '回滚改动。' },
    {
        id: 32,
        code: ':twisted_rightwards_arrows:',
        emoji: '🔀',
        color: '#56d1d8',
        description: '合并分支。',
    },
    {
        id: 33,
        code: ':package:',
        emoji: '📦️',
        color: '#fdd0ae',
        description: '更新编译后的文件或者包。',
    },
    {
        id: 34,
        code: ':alien:',
        emoji: '👽️',
        color: '#c5e763',
        description: '由于外部 API 变动而更新代码。',
    },
    { id: 35, code: ':truck:', emoji: '🚚', color: '#ef584a', description: '文件移动或者重命名。' },
    {
        id: 36,
        code: ':page_facing_up:',
        emoji: '📄',
        color: '#d9e3e8',
        description: '添加或者更新许可。',
    },
    { id: 37, code: ':boom:', emoji: '💥', color: '#f94f28', description: '引入破坏性的改动。' },
    {
        id: 38,
        code: ':bento:',
        emoji: '🍱',
        color: '#ff5864',
        description: '添加或者更新静态资源。',
    },
    { id: 39, code: ':wheelchair:', emoji: '♿️', color: '#00b1fb', description: '改进可访问性。' },
    { id: 40, code: ':bulb:', emoji: '💡', color: '#ffce49', description: '给源代码加文档。' },
    { id: 41, code: ':beers:', emoji: '🍻', color: '#fbb64b', description: '醉写代码。' },
    {
        id: 42,
        code: ':speech_balloon:',
        emoji: '💬',
        color: '#cedae6',
        description: '更新文本和字面。',
    },
    {
        id: 43,
        code: ':card_file_box:',
        emoji: '🗃️',
        color: '#c5e763',
        description: '执行数据库相关的改动。',
    },
    { id: 44, code: ':loud_sound:', emoji: '🔊', color: '#23b4d2', description: '添加日志。' },
    { id: 45, code: ':mute:', emoji: '🔇', color: '#e6ebef', description: '删除日志。' },
    {
        id: 46,
        code: ':busts_in_silhouette:',
        emoji: '👥',
        color: '#ffce49',
        description: '添加贡献者（们）。',
    },
    {
        id: 47,
        code: ':children_crossing:',
        emoji: '🚸',
        color: '#ffce49',
        description: '改进用户体验 / 可用性。',
    },
    {
        id: 48,
        code: ':building_construction:',
        emoji: '🏗️',
        color: '#ffe55f',
        description: '架构改动。',
    },
    { id: 49, code: ':iphone:', emoji: '📱', color: '#40c4ff', description: '响应性设计相关。' },
    { id: 50, code: ':clown_face:', emoji: '🤡', color: '#ff7281', description: '模拟相关。' },
    { id: 51, code: ':egg:', emoji: '🥚', color: '#77e856', description: '添加一个彩蛋。' },
    {
        id: 52,
        code: ':see_no_evil:',
        emoji: '🙈',
        color: '#8bdfe7',
        description: '添加或者更新 .gitignore 文件。',
    },
    {
        id: 53,
        code: ':camera_flash:',
        emoji: '📸',
        color: '#00a9f0',
        description: '添加或者更新快照。',
    },
    { id: 54, code: ':alembic:', emoji: '⚗️', color: '#7f39fb', description: '研究新事物。' },
    { id: 55, code: ':mag:', emoji: '🔍️', color: '#ffe55f', description: '改进搜索引擎优化。' },
    {
        id: 56,
        code: ':label:',
        emoji: '🏷️',
        color: '#cb63e6',
        description: '添加或者更新类型（Flow, TypeScript）。',
    },
    {
        id: 57,
        code: ':seedling:',
        emoji: '🌱',
        color: '#c5e763',
        description: '添加或更新种子文件。',
    },
    {
        id: 58,
        code: ':triangular_flag_on_post:',
        emoji: '🚩',
        color: '#ffce49',
        description: '添加、更新或删除功能标志。',
    },
    { id: 59, code: ':goal_net:', emoji: '🥅', color: '#c7cb12', description: '捕捉异常错误。' },
    {
        id: 60,
        code: ':dizzy:',
        emoji: '💫',
        color: '#ffdb3a',
        description: '添加或更新动画和过渡。',
    },
    {
        id: 61,
        code: ':wastebasket:',
        emoji: '🗑️',
        color: '#d9e3e8',
        description: '弃用需要清理的代码。',
    },
    {
        id: 62,
        code: ':passport_control:',
        emoji: '🛂',
        color: '#4dc6dc',
        description: '处理与授权、角色和权限相关的代码。',
    },
    {
        id: 63,
        code: ':adhesive_bandage:',
        emoji: '🩹',
        color: '#fbcfb7',
        description: '对非关键问题的简单修复。',
    },
    {
        id: 64,
        code: ':monocle_face:',
        emoji: '🧐',
        color: '#ffe55f',
        description: '数据探索/检查。',
    },
    { id: 65, code: ':coffin:', emoji: '⚰️', color: '#d9e3e8', description: '移除无用代码。' },
    {
        id: 66,
        code: ':test_tube:',
        emoji: '🧪',
        color: '#fb584a',
        description: '添加一个失败的测试。',
    },
    {
        id: 67,
        code: ':necktie:',
        emoji: '👔',
        color: '#83beec',
        description: '添加或更新业务逻辑。',
    },
    {
        id: 68,
        code: ':stethoscope:',
        emoji: '🩺',
        color: '#77e856',
        description: '添加或更新健康检查。',
    },
    {
        id: 69,
        code: ':bricks:',
        emoji: '🧱',
        color: '#ff6723',
        description: '基础设施相关的变化。',
    },
    {
        id: 70,
        code: ':technologist:',
        emoji: '🧑‍💻',
        color: '#86B837',
        description: '改善开发者体验。',
    },
    {
        id: 71,
        code: ':money_with_wings:',
        emoji: '💸',
        color: '#b3c0b1',
        description: '添加赞助或与金钱相关的基础设施。',
    },
    {
        id: 72,
        code: ':thread:',
        emoji: '🧵',
        color: '#ffbe7b',
        description: '添加或更新与多线程或并发相关的代码。',
    },
    {
        id: 73,
        code: ':safety_vest:',
        emoji: '🦺',
        color: '#f2ad52',
        description: '添加或更新与验证相关的代码。',
    },
    { id: 74, code: ':whale:', emoji: '🐳', color: '#00a6ab', description: 'Docker 相关操作。' },
];

const Index: FC<ComProps> = ({ visible, onChange }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    useEffect(() => {
        setModalVisible(visible ?? false);

        return () => {
            setModalVisible(false);
        };
    }, [visible]);

    let handlerShowCopyMessage = async (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        text: string
    ) => {
        e.stopPropagation();
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(text);
        } else {
            let copyInput = document.createElement('input');
            copyInput.value = text;
            copyInput.style.position = 'absolute';
            copyInput.style.left = '-999999px';
            document.body.appendChild(copyInput);
            copyInput.select();
            document.execCommand('copy');
            document.body.removeChild(copyInput);

            try {
                document.execCommand('copy');
            } catch (error) {
                console.error(error);
            } finally {
                copyInput.remove();
            }
        }

        Toast.success('gitmoji ' + text + ' 复制成功！');
    };

    return (
        <Modal
            visible={modalVisible}
            onCancel={() => {
                setModalVisible(false);
                onChange && onChange(false);
            }}
            centered
            bodyStyle={{ height: 'calc(100vh - 200px)', overflowY: 'auto', overflowX: 'hidden' }}
            style={{ width: 1200 }}
            header={undefined}
            footer={undefined}
        >
            <List
                grid={{
                    gutter: 2,
                    justify: 'center',
                }}
                style={{ padding: 10 }}
                layout="horizontal"
                dataSource={emojis}
                renderItem={(item) => (
                    <List.Item>
                        <div onClick={(e) => handlerShowCopyMessage(e, item.emoji || '')}>
                            <Card
                                shadows="hover"
                                className="gitmoji-container-gitmoji"
                                style={{ backgroundColor: item.color }}
                            >
                                <div className="gitmoji-container-gitmoji-header">{item.emoji}</div>

                                <div className="gitmoji-container-gitmoji-code">
                                    <Button
                                        theme="borderless"
                                        onClick={(e) => handlerShowCopyMessage(e, item.code || '')}
                                    >
                                        {item.code}
                                    </Button>
                                </div>
                                <div style={{ margin: 6, textAlign: 'center' }}>
                                    <Text strong style={{ wordBreak: 'break-word' }}>
                                        {item.description}
                                    </Text>
                                </div>
                            </Card>
                        </div>
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default Index;
