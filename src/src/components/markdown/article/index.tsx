import { MdPreview } from 'md-editor-rt';
import React, { CSSProperties, useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import useTheme from '@src/stores/useTheme';
import 'md-editor-rt/lib/style.css';
import { debounce } from '@src/utils/md';

interface Props {
    articleId?: string;
    content?: string;
    className?: string;
    style?: CSSProperties;
}

const onHtmlChanged = debounce(() => {
    const { hash } = location;

    if (/^#/.test(hash)) {
        const headingId = decodeURIComponent(hash.replace('#', ''));

        if (headingId) {
            const targetHeadDom = document.getElementById(headingId);

            if (targetHeadDom) {
                const scrollLength = (targetHeadDom as HTMLHeadElement).offsetTop + 385;

                window.scrollTo({
                    top: scrollLength,
                    behavior: 'smooth',
                });
            }
        }
    }
});

const MarkDown: React.FC<Props> = ({ articleId, content, className, style }) => {
    const theme = useTheme((state) => state.theme, shallow);
    const [mdContent, setMdContent] = useState<string>('');

    useEffect(() => {
        setMdContent(content ?? '');
    }, [content]);

    return (
        <div style={style} className={`article-marked ${className || ''}`}>
            <MdPreview
                editorId={`article-detail-id-${articleId}`}
                theme={theme}
                modelValue={mdContent}
                previewTheme="github"
                codeTheme="vs"
                onHtmlChanged={onHtmlChanged}
            />
        </div>
    );
};

export default MarkDown;
