import { FC } from 'react';
import { Layout, Typography } from '@douyinfe/semi-ui';
import CallMe from '@components/call-me';

import './index.scss';

const adminSite = import.meta.env.VITE_ADMIN_SITE;
const { Footer } = Layout;
const { Text } = Typography;

const CustFooter: FC = () => {
    return (
        <Footer className="blog-footer-wrap">
            <div className="blog-footer-wrap-box">
                <div>
                    <CallMe />
                </div>
                <Text strong>Design & Code by @memoyu, Made with .NET & React</Text>
                <div className="beian">
                    <a href="http://beian.miit.gov.cn" rel="nofollow" target="_blank">
                        <Text> 桂ICP备20005450号-2</Text>
                    </a>
                    <a style={{ marginLeft: 10 }} rel="noreferrer">
                        <img
                            src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png"
                            alt="网安徽章"
                        />
                        <Text>桂公网安备</Text>
                    </a>
                </div>
                <div className="blog-admin">
                    <a href={adminSite} rel="nofollow" target="_blank">
                        <Text>{'---> BLOG管理端 <---'}</Text>
                    </a>
                </div>
                {/* <Text>2024 © memoyu</Text> */}
            </div>
        </Footer>
    );
};

export default CustFooter;
