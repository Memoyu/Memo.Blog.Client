import { FC } from 'react';

import './index.scss';

interface ComProps {
    articleId?: string;
}

const Index: FC<ComProps> = ({ articleId }) => {
    return (
        <div className="copyright-wrap">
            <div className="copyright-wrap-title">转载请注明来源：</div>
            <div className="copyright-content-link">{`http://www.memoyu.com/article/detail/${articleId}`}</div>
        </div>
    );
};

export default Index;
