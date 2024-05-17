import { Typography } from '@douyinfe/semi-ui';
import MarkdownNavbar from 'markdown-navbar';

import './index.scss';

interface Props {
    content?: string;
}

const { Title } = Typography;

const Index: React.FC<Props> = ({ content }) => {
    return (
        <div>
            <Title heading={4} style={{ textAlign: 'center' }}>
                目录
            </Title>
            <MarkdownNavbar source={content || ''} />
        </div>
    );
};

export default Index;
