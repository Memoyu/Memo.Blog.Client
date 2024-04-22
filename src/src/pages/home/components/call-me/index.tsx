import React, { FC, ReactNode } from 'react';
import { Space, Button, Tooltip } from '@douyinfe/semi-ui';
import { IconGithubLogo, IconComment, IconMail } from '@douyinfe/semi-icons';

import './index.scss';

interface CallMe {
    to?: string;
    title: string;
    icon: ReactNode;
}
interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const summaries: Array<CallMe> = [
        { to: '文章', title: 'Wechat', icon: <IconComment /> },
        { to: '文章', title: 'Email', icon: <IconMail /> },
        { to: '文章', title: 'Github', icon: <IconGithubLogo /> },
    ];
    return (
        <Space wrap>
            {summaries.map((s) => {
                return (
                    <Tooltip key={s.title} content={s.title}>
                        <Button icon={s.icon} aria-label={s.title} />
                    </Tooltip>
                );
            })}
        </Space>
    );
};

export default Index;
