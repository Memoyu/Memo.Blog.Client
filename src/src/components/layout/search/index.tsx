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

import { useSearch, useSearchModal } from '@src/stores';
import { shallow } from 'zustand/shallow';

import { articleSearchPage } from '@src/utils/request';

import { ArticleSearchPageModel } from '@src/common/model';

import './index.scss';
import { ARTICLE_DETAIL_URL } from '@src/common/constant';

const { Title, Paragraph } = Typography;

const Index: FC = () => {
    const show = useSearchModal((state) => state.show, shallow);
    const { setShow } = useSearchModal((state) => state);
    const records = useSearch((state) => state.records, shallow);
    const { addRecord, removeRecord, clearRecord } = useSearch((state) => state);

    const [keyWord, setKeyWord] = useState<string>('');
    const [keyWordSegs, setKeyWordSegs] = useState<Array<string>>();
    const [searchResult, setSearchResult] = useState<Array<ArticleSearchPageModel>>([]);

    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const searchNoMoreRef = useRef<boolean>(true);
    const pageSize = 3;
    const searchResultPageRef = useRef<number>(1);

    const getSearchResultPage = (keyWord: string) => {
        if (keyWord.trim().length < 1) return;

        setSearchLoading(true);
        addRecord(keyWord);

        articleSearchPage({
            keyWord: keyWord,
            page: searchResultPageRef.current,
            size: pageSize,
        })
            .then((res) => {
                if (!res.isSuccess || !res.data || !res.data?.items) return;

                setKeyWordSegs(res.data.keyWordSegs);
                setSearchResult((old) => {
                    let items =
                        searchResultPageRef.current == 1
                            ? res.data!.items
                            : [...(old ?? []), ...res.data!.items];

                    searchNoMoreRef.current = items.length >= res.data!.total;
                    return items;
                });
            })
            .finally(() => setSearchLoading(false));
    };

    useEffect(() => {
        return () => {
            setKeyWord('');
            setSearchResult([]);
            searchResultPageRef.current = 1;
            searchNoMoreRef.current = true;
        };
    }, [show]);

    const handleInputEnterPress = () => {
        searchResultPageRef.current = 1;
        getSearchResultPage(keyWord);
    };

    const handleLoadMoreClick = () => {
        searchResultPageRef.current += 1;
        getSearchResultPage(keyWord);
    };

    const loadMoreRender =
        !searchLoading && !searchNoMoreRef.current ? (
            <div className="search-result-load-more">
                <Button onClick={handleLoadMoreClick}>显示更多</Button>
            </div>
        ) : null;

    const emptyRender = (
        <Empty
            image={<IllustrationNoResult />}
            darkModeImage={<IllustrationNoResultDark />}
            description={'空空如也！'}
        />
    );

    const highlightStyle = {
        borderRadius: 6,
        // padding: '0 3px ',
        // margin: '0 3px ',
        backgroundColor: 'var(--semi-color-primary-light-default)',
    };

    return (
        <Modal
            className="global-search-modal"
            header={null}
            footer={null}
            maskClosable={true}
            visible={show}
            onCancel={() => setShow(false)}
            centered
            preventScroll={false}
        >
            <div className="global-search-modal-content">
                <Input
                    showClear
                    placeholder="搜索文章、评论"
                    value={keyWord}
                    onChange={setKeyWord}
                    onEnterPress={handleInputEnterPress}
                ></Input>
                <div className="search-records">
                    {keyWord.trim().length < 1 && (
                        <>
                            <div className="search-records-title">
                                搜索历史
                                <Button
                                    className="header-tool"
                                    theme="borderless"
                                    onClick={() => clearRecord()}
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
                                            onClose={() => removeRecord(r)}
                                            onClick={() => {
                                                setKeyWord(r);
                                                getSearchResultPage(r);
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
                    {keyWord.trim().length > 0 && (
                        <List
                            loading={searchLoading}
                            loadMore={loadMoreRender}
                            dataSource={searchResult}
                            emptyContent={emptyRender}
                            renderItem={(item) => (
                                <List.Item
                                    style={{ padding: 5 }}
                                    main={
                                        <div className="search-result-item">
                                            <Title
                                                heading={6}
                                                link={{
                                                    href: ARTICLE_DETAIL_URL + item.articleId,
                                                    target: '_blank',
                                                }}
                                                style={{ marginBottom: 7 }}
                                            >
                                                <Highlight
                                                    className={'search-result-item-highlight'}
                                                    sourceString={item.title}
                                                    searchWords={keyWordSegs}
                                                    highlightStyle={highlightStyle}
                                                />
                                            </Title>

                                            <Paragraph
                                                ellipsis={{
                                                    rows: 2,
                                                }}
                                                style={{ width: 300 }}
                                            >
                                                <Highlight
                                                    className={'search-result-item-highlight'}
                                                    sourceString={item.content}
                                                    searchWords={keyWordSegs}
                                                    highlightStyle={highlightStyle}
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
