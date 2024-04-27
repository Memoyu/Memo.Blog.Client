import { FC, ReactNode, useState } from 'react';

import { Card, List, Typography } from '@douyinfe/semi-ui';

import Gitmoji from '../git-moji';

import './index.scss';

const { Text } = Typography;

interface ComProps {}

interface ToolConfig {
    id: number;
    title: string;
    children?: ReactNode;
    onClick?: (config: ToolConfig) => void;
}

const { Meta } = Card;

const Index: FC<ComProps> = ({}) => {
    const tools: Array<ToolConfig> = [
        {
            id: 1,
            title: 'Gitmoji',
            children: <div style={{ color: 'white', fontSize: 56 }}>🤔</div>,
            onClick: () => {
                setGitmojiVisible(true);
            },
        },
    ];

    const [gitmojiVisible, setGitmojiVisible] = useState<boolean>();
    return (
        <div className="com-tools">
            <List
                grid={{
                    gutter: 12,
                }}
                layout="horizontal"
                dataSource={tools}
                renderItem={(item) => (
                    <List.Item>
                        <div onClick={() => item.onClick && item.onClick(item)}>
                            <Card
                                shadows="hover"
                                style={{ minWidth: 150, margin: 10 }}
                                cover={
                                    <div
                                        style={{
                                            minHeight: 100,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.children}
                                    </div>
                                }
                            >
                                <Meta
                                    title={
                                        <Text style={{ width: '100%', textAlign: 'center' }}>
                                            {item.title}
                                        </Text>
                                    }
                                />
                            </Card>
                        </div>
                    </List.Item>
                )}
            />
            <Gitmoji visible={gitmojiVisible} onChange={setGitmojiVisible} />
        </div>
    );
};

export default Index;
