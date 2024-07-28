import { useEffect } from 'react';
import { Space, Tag, Toast, Typography } from '@douyinfe/semi-ui';

import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import PageBanner from '@src/components/page-banner';
import MarkDown from '@components/markdown/article';

import { usePageVisit } from '@src/hooks/usePageVisit';
import { useData } from '@src/hooks/useData';

import { aboutGet } from '@src/utils/request';

import { AboutModel } from '@src/common/model';

import './index.scss';
import Friends from './components/friends';

const { Title } = Typography;

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
        <PageContainer>
            <PageBanner image={about.banner} />
            <ContentContainer className="about-me-wrap">
                <div className="about-me-content">
                    <Title heading={2} style={{ marginBottom: 30, textAlign: 'center' }}>
                        {about.title}
                    </Title>
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
                </div>
                <div className="friend-content">
                    <Title heading={4}>友情链接</Title>
                    <Friends />
                </div>
            </ContentContainer>
        </PageContainer>
    );
};

export default Index;
