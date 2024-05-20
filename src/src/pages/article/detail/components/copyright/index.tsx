import { FC } from 'react';

import './index.scss';
import { Toast, Typography } from '@douyinfe/semi-ui';

interface ComProps {
    articleId?: string;
}

const { Paragraph } = Typography;

const Index: FC<ComProps> = ({ articleId }) => {
    return (
        <div className="copyright-wrap">
            <div className="copyright-wrap-title">转载请注明来源：</div>
            <Paragraph
                className="copyright-wrap-link"
                ellipsis={{ pos: 'middle' }}
                copyable={{
                    successTip: false,
                    onCopy: () => {
                        Toast.success('复制成功！');
                    },
                }}
            >{`http://www.memoyu.com/article/detail/${articleId}`}</Paragraph>
        </div>
    );
};

export default Index;
