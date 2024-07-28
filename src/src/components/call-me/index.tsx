import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Space, Tooltip, Image } from '@douyinfe/semi-ui';
import { IconGithubLogo, IconPhoneStroke, IconComment, IconMail } from '@douyinfe/semi-icons';
import { QRCodeCanvas } from 'qrcode.react';

import WechatQrcode from '@assets/images/wechat-qrcode.jpg';

import './index.scss';

const webSite = import.meta.env.VITE_WEB_SITE;

interface CallMe {
    to?: string;
    title: string | ReactNode;
    icon: ReactNode;
    className?: string;
}
interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const qrcodeSize = 96;
    const summaries: Array<CallMe> = [
        {
            title: (
                <QRCodeCanvas
                    id="site-qrcode"
                    value={webSite}
                    size={128}
                    imageSettings={{
                        excavate: false,
                        x: undefined,
                        y: undefined,
                        src: 'http://oss.blog.memoyu.com/account/avatar/fbca90ce-9197-4a00-8836-eaafef3e0fe2.png',
                        width: 30,
                        height: 30,
                    }}
                    style={{ width: qrcodeSize, height: qrcodeSize }}
                />
            ),
            icon: <IconPhoneStroke />,
            className: 'call-me-wrap-site-qrcode',
        },
        {
            title: <Image width={qrcodeSize} height={qrcodeSize} src={WechatQrcode} />,
            icon: <IconComment />,
        },
        { to: 'mailto:mmy6076@outlook.com', title: 'Email', icon: <IconMail /> },
        { to: 'https://github.com/Memoyu', title: 'Github', icon: <IconGithubLogo /> },
    ];
    return (
        <Space wrap className="call-me-wrap">
            {summaries.map((s, idx) => {
                return (
                    <div key={idx} className={s.className}>
                        <Tooltip content={s.title}>
                            {s.to ? (
                                <NavLink to={s.to} target="_blank">
                                    <div className="nav-link-icon">{s.icon}</div>
                                </NavLink>
                            ) : (
                                <div className="nav-link-icon">{s.icon}</div>
                            )}
                        </Tooltip>
                    </div>
                );
            })}
        </Space>
    );
};

export default Index;
