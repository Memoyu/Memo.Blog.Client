import { FC } from 'react';

import './index.scss';
import { Space, Tag } from '@douyinfe/semi-ui';
import { TagModel } from '@src/common/model';

interface ComProps {
    tags?: Array<TagModel>;
}

const Index: FC<ComProps> = ({ tags }) => {
    return (
        <div
            style={{
                padding: '0 10px',
                backgroundColor: 'rgba(var(--semi-grey-1), 0.2)',
                borderRadius: 10,
            }}
        >
            <Space
                wrap
                style={{
                    width: '100%',
                    padding: '13px 0',
                }}
            >
                {tags?.map((item) => (
                    <Tag
                        key={item.tagId}
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            padding: '14px 14px',
                            color: 'var(--semi-color-primary)',
                        }}
                    >
                        {item.name}
                    </Tag>
                ))}
            </Space>
        </div>
    );
};

export default Index;
