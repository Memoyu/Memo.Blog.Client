import { FC } from 'react';
import { Button, Input, Modal, Tag, TagGroup } from '@douyinfe/semi-ui';

import { useSearch } from '@src/stores';
import { shallow } from 'zustand/shallow';

import './index.scss';
import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';

const Index: FC = () => {
    const show = useSearch((state) => state.show, shallow);
    const records = useSearch((state) => state.records, shallow);
    const setShow = useSearch((state) => state.setShow);

    const getRecords = records.map((r) => {
        return {
            color: 'purple',
            children: r,
            closable: true,
            onClick: () => {
                console.log('点击标签');
            },
        } as TagProps;
    });
    const tagGroupStyle = {
        display: 'flex',
        alignItems: 'center',
        width: 350,
    };
    return (
        <Modal
            header={null}
            footer={null}
            maskClosable={true}
            visible={show}
            onCancel={() => setShow(false)}
            centered
        >
            <div className="global-search-modal">
                <Input showClear></Input>
                <div className="search-wrap">
                    <div className="search-wrap-records">
                        搜索历史
                        <Button className="header-tool" theme="borderless" onClick={() => {}}>
                            清空
                        </Button>
                    </div>
                    <TagGroup
                        style={tagGroupStyle}
                        tagList={getRecords}
                        avatarShape="circle"
                        size="large"
                        onTagClose={() => console.log('点击标签清除')}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default Index;
