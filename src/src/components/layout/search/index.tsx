import { FC, useState, useRef, useEffect } from 'react';
import {
    Button,
    Input,
    List,
    Modal,
    Space,
    Tag,
    Typography,
    Highlight,
    Empty,
} from '@douyinfe/semi-ui';
import { IllustrationNoResult, IllustrationNoResultDark } from '@douyinfe/semi-illustrations';

import { useSearch } from '@src/stores';
import { shallow } from 'zustand/shallow';

import { SearchResultModel } from '@src/common/model';

import './index.scss';
import { useOnMountUnsafe } from '@src/hooks/useOnMountUnsafe';

const { Text, Paragraph } = Typography;

const Index: FC = () => {
    const show = useSearch((state) => state.show, shallow);
    const records = useSearch((state) => state.records, shallow);
    const setShow = useSearch((state) => state.setShow);

    const [searchWord, setSearchWord] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Array<SearchResultModel>>([]);

    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const searchNoMoreRef = useRef<boolean>(true);
    const searchResultPageRef = useRef<number>(1);

    const getSearchResultPage = () => {
        setSearchResult([{ link: '', title: '222222', content: '33333' }]);
    };

    // useOnMountUnsafe(() => {
    //     getSearchResultPage();
    // });

    useEffect(() => {
        getSearchResultPage();
        return () => {
            setSearchWord('');
            setSearchResult([]);
        };
    }, [show]);

    const loadMoreRender =
        !searchLoading && !searchNoMoreRef.current ? (
            <div className="search-result-load-more">
                <Button onClick={() => getSearchResultPage()}>显示更多</Button>
            </div>
        ) : null;
    const emptyRender = (
        <Empty
            image={<IllustrationNoResult />}
            darkModeImage={<IllustrationNoResultDark />}
            description={'空空如也！'}
        />
    );
    return (
        <Modal
            className="global-search-modal"
            header={null}
            footer={null}
            maskClosable={true}
            visible={show}
            onCancel={() => setShow(false)}
            centered
        >
            <div className="global-search-modal-content">
                <Input showClear placeholder="搜索文章" onChange={setSearchWord}></Input>
                <div className="search-records">
                    {searchWord.trim().length < 1 && (
                        <>
                            <div className="search-records-title">
                                搜索历史
                                <Button
                                    className="header-tool"
                                    theme="borderless"
                                    onClick={() => {}}
                                >
                                    清空
                                </Button>
                            </div>

                            <Space wrap className="search-records-list">
                                {records.map((r) => {
                                    return (
                                        <Tag
                                            tagKey={r}
                                            color="purple"
                                            size="large"
                                            closable
                                            onClose={() => {
                                                console.log('清除标签');
                                            }}
                                            onClick={() => {
                                                console.log('点击标签');
                                            }}
                                        >
                                            {r}
                                        </Tag>
                                    );
                                })}
                            </Space>
                        </>
                    )}
                </div>

                <div className="search-result">
                    {searchWord.trim().length > 0 && (
                        <List
                            loading={searchLoading}
                            loadMore={loadMoreRender}
                            dataSource={searchResult}
                            emptyContent={emptyRender}
                            renderItem={(item) => (
                                <List.Item
                                    style={{ padding: 5 }}
                                    main={
                                        <div>
                                            <Text
                                                strong
                                                link={
                                                    item.link.length > 1 && {
                                                        href: item.link,
                                                        target: '_blank',
                                                    }
                                                }
                                            >
                                                {item.title}
                                            </Text>

                                            <Paragraph
                                                ellipsis={{
                                                    rows: 3,
                                                }}
                                                style={{ width: 280, marginLeft: 10 }}
                                            >
                                                <Highlight
                                                    className={'search-result-highlight'}
                                                    sourceString={item.content}
                                                    searchWords={[searchWord]}
                                                />
                                            </Paragraph>
                                        </div>
                                    }
                                />
                            )}
                        />
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default Index;
