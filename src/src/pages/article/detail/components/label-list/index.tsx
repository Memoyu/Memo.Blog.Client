import { FC } from 'react';
import { Space } from '@douyinfe/semi-ui';

import './index.scss';

export interface LabelItem {
    label?: string;
    title?: string;
    desc?: string;
}

interface ComProps {
    labels?: Array<LabelItem>;
}

const Index: FC<ComProps> = ({ labels }) => {
    return (
        <Space wrap className="label-list-wrap">
            {labels?.map((l) => (
                <div key={l.label} className="label-list-wrap-item">
                    <div className="label-list-wrap-item-label">{l.label}</div>
                    <div className="label-list-wrap-item-main">
                        <div className="label-list-wrap-item-main-title">{l.title}</div>
                        <div className="label-list-wrap-item-main-desc">{l.desc}</div>
                    </div>
                </div>
            ))}
        </Space>
    );
};

export default Index;
