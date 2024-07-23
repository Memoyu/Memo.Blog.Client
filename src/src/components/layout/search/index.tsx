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

const { Text, Title, Paragraph } = Typography;

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
    const pageSize = 15;
    const searchResultPageRef = useRef<number>(1);

    const getSearchResultPage = (keyWord: string) => {
        if (keyWord.trim().length < 1) return;

        addRecord(keyWord);

        articleSearchPage({
            keyWord: keyWord,
            page: searchResultPageRef.current,
            size: pageSize,
        }).then((res) => {
            if (!res.isSuccess || !res.data) return;
            console.log(res);
            setKeyWordSegs(res.data.keyWordSegs);
            setSearchResult(res.data.items);
        });
    };

    useEffect(() => {
        return () => {
            setKeyWord('');
            setSearchResult([]);
        };
    }, [show]);

    const loadMoreRender =
        !searchLoading && !searchNoMoreRef.current ? (
            <div className="search-result-load-more">
                <Button onClick={() => getSearchResultPage(keyWord)}>显示更多</Button>
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
        padding: '0 5px ',
        margin: '0 3px ',
        backgroundColor: 'rgba(var(--semi-teal-5), 1)',
        color: 'rgba(var(--semi-white), 1)',
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
        >
            <div className="global-search-modal-content">
                <Input
                    showClear
                    placeholder="搜索文章、评论"
                    value={keyWord}
                    onChange={setKeyWord}
                    onEnterPress={() => getSearchResultPage(keyWord)}
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
                                        <div>
                                            <Title
                                                heading={6}
                                                link={{
                                                    href: ARTICLE_DETAIL_URL + item.articleId,
                                                    target: '_blank',
                                                }}
                                            >
                                                <Highlight
                                                    className={'search-result-highlight'}
                                                    sourceString={item.title}
                                                    searchWords={keyWordSegs}
                                                    highlightStyle={highlightStyle}
                                                />
                                            </Title>

                                            <Paragraph
                                                ellipsis={{
                                                    rows: 3,
                                                }}
                                                style={{ width: 380 }}
                                            >
                                                <Highlight
                                                    className={'search-result-highlight'}
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
