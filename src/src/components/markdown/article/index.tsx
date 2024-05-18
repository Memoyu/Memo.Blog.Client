import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import React, { CSSProperties } from 'react';

//import './hljs.custom.scss';
import 'highlight.js/styles/atom-one-dark.css';
import './index.scss';

interface Props {
    content?: string;
    className?: string;
    style?: CSSProperties;
}

const MarkDown: React.FC<Props> = ({ content, className, style }) => {
    hljs.configure({
        classPrefix: 'hljs-',
        languages: ['C#', 'JSON', 'CSS', 'HTML', 'JavaScript', 'TypeScript', 'Markdown'],
    });

    const marked = new Marked(
        markedHighlight({
            langPrefix: 'hljs language-',
            highlight(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            },
        })
    );
    marked.setOptions({
        gfm: true, // 默认为true。 允许 Git Hub标准的markdown.
        breaks: true, // 默认为false。 允许回车换行。该选项要求 gfm 为true。 注释
    });

    return (
        <div
            style={style}
            className={`article-marked ${className || ''}`}
            dangerouslySetInnerHTML={{
                __html: marked.parse(content || ''),
            }}
        />
    );
};

export default MarkDown;
