import { useEffect } from 'react';
import { Space, Tag, Toast } from '@douyinfe/semi-ui';

import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import PageBanner from '@src/components/page-banner';
import MarkDown from '@components/markdown';

import { usePageVisit } from '@src/hooks/usePageVisit';
import { useData } from '@src/hooks/useData';

import { aboutGet } from '@src/utils/request';

import { AboutModel } from '@src/common/model';

import './index.scss';

const Index = () => {
    const [about, _loading, setAbout, _setLoading] = useData<AboutModel>({} as AboutModel);

    usePageVisit();

    // 获取关于我
    let getAboutMe = async () => {
        let res = await aboutGet();
        if (!res.isSuccess || !res.data) {
            Toast.error(res.message);
            return;
        }

        let article = res.data;
        setAbout(article);
    };

    useEffect(() => {
        getAboutMe();
    }, []);

    return (
        <div>
            <PageContainer>
                <PageBanner image="http://oss.blog.memoyu.com/articles/banner/6732956b-728a-47cc-9769-defced63cda0.png" />
                <ContentContainer className="about-me-content">
                    <Space wrap style={{ display: 'flex', justifyContent: 'center' }}>
                        {about?.tags?.map((t) => {
                            return (
                                <Tag
                                    key={t}
                                    size="large"
                                    style={{
                                        fontSize: 14,
                                        padding: '7px 9px',
                                        color: 'var(--semi-color-primary)',
                                    }}
                                >
                                    {t}
                                </Tag>
                            );
                        })}
                    </Space>
                    <MarkDown content={about?.content} />
                </ContentContainer>
            </PageContainer>
        </div>
    );
};

export default Index;
