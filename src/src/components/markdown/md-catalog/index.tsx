import { Typography } from '@douyinfe/semi-ui';
import { MdCatalog } from 'md-editor-rt';

import './index.scss';
import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import useTheme from '@src/stores/useTheme';
import { TocItem } from 'md-editor-rt/lib/types/MdCatalog';

interface Props {
    articleId: string;
}

const { Title } = Typography;

const Index: React.FC<Props> = ({ articleId }) => {
    const [scrollElement] = useState(document.documentElement);
    const theme = useTheme((state) => state.theme, shallow);

    const onClick = (_: any, t: TocItem) => {
        history.replaceState({}, '', `${location.pathname}#${t.text}`);
    };

    return (
        <div>
            <Title heading={4} className="markdown-navigation-title">
                目录
            </Title>
            <MdCatalog
                editorId={`article-detail-id-${articleId}`}
                theme={theme}
                offsetTop={57}
                scrollElementOffsetTop={57}
                scrollElement={scrollElement}
                onClick={onClick}
            />
        </div>
    );
};

export default Index;
