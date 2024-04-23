import { useEffect } from 'react';
import { Space, Tag, Toast } from '@douyinfe/semi-ui';

import Container from '@components/layout/container';
import PageBanner from '@src/components/page-banner';
import MarkDown from '@components/markdown';
import Footer from '@components/layout/footer';
import { aboutGet } from '@src/utils/request';

import { useData } from '@src/hooks/useData';

import { AboutModel } from '@src/common/model';

import './index.scss';

const Index = () => {
    const [about, loading, setAbout, setLoading] = useData<AboutModel>();

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
            <PageBanner image="http://oss.blog.memoyu.com/articles/banner/6732956b-728a-47cc-9769-defced63cda0.png" />
            <Container className="about-me-content">
                <Space wrap style={{ display: 'flex', justifyContent: 'center' }}>
                    {about?.tags.map((t) => {
                        return (
                            <Tag
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
            </Container>
            <Footer />
        </div>
    );
};

export default Index;
