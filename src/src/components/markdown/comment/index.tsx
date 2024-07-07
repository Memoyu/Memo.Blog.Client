import { MdPreview } from 'md-editor-rt';
import React, { CSSProperties, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import useTheme from '@src/stores/useTheme';

import './index.scss';

interface Props {
    commentId?: string;
    content?: string;
    className?: string;
    style?: CSSProperties;
}

const MarkDown: React.FC<Props> = ({ commentId, content, className, style }) => {
    const theme = useTheme((state) => state.theme, shallow);
    const [mdContent, setMdContent] = useState<string>('');

    useEffect(() => {
        setMdContent(content ?? '');
    }, [content]);

    return (
        <div style={style} className={`article-marked ${className || ''}`}>
            <MdPreview
                editorId={`article-comment-id-${commentId}`}
                theme={theme}
                modelValue={mdContent}
                previewTheme="github"
                codeTheme="vs"
            />
        </div>
    );
};

export default MarkDown;
