import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Space, Tooltip, Image } from '@douyinfe/semi-ui';
import { IconGithubLogo, IconComment, IconMail } from '@douyinfe/semi-icons';

import WechatQrcode from '@assets/images/wechat-qrcode.jpg';
import './index.scss';

interface CallMe {
    to?: string;
    title: string | ReactNode;
    icon: ReactNode;
}
interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const summaries: Array<CallMe> = [
        { title: <Image width={96} height={96} src={WechatQrcode} />, icon: <IconComment /> },
        { to: 'mailto:mmy6076@outlook.com', title: 'Email', icon: <IconMail /> },
        { to: 'https://github.com/Memoyu', title: 'Github', icon: <IconGithubLogo /> },
    ];
    return (
        <Space wrap className="call-me-wrap">
            {summaries.map((s, idx) => {
                return (
                    <Tooltip key={idx} content={s.title}>
                        {s.to ? (
                            <NavLink to={s.to} target="_blank">
                                <div className="nav-link-icon">{s.icon}</div>
                            </NavLink>
                        ) : (
                            <div className="nav-link-icon">{s.icon}</div>
                        )}
                    </Tooltip>
                );
            })}
        </Space>
    );
};

export default Index;
