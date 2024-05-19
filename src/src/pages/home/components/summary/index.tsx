import { FC, useEffect, useState } from 'react';
import { Col, Row, Toast, Typography } from '@douyinfe/semi-ui';

import './index.scss';
import { articleSummary } from '@src/utils/request';
import { cloneDeep } from 'lodash';

const { Text, Title } = Typography;

interface ComProps {}

interface Summary {
    name: string;
    value: number;
    unit: string;
}

const Index: FC<ComProps> = ({}) => {
    const initSummaries: Array<Summary> = [
        { name: '文章', value: 0, unit: '篇' },
        { name: '评论', value: 0, unit: '条' },
        { name: '动态', value: 0, unit: '条' },
    ];

    const [summaries, setSummaries] = useState<Array<Summary>>(initSummaries);

    // 获取文章汇总
    let getArticleSummary = async () => {
        let res = await articleSummary();
        if (!res.isSuccess || !res.data) {
            Toast.error(res.message);
            return;
        }

        let clone = cloneDeep(initSummaries);
        clone[0].value = res.data.articles;
        clone[1].value = res.data.comments;
        clone[2].value = res.data.moments;
        setSummaries(clone);
    };

    useEffect(() => {
        getArticleSummary();
    }, []);

    return (
        <Row gutter={8}>
            {summaries.map((s) => {
                return (
                    <Col key={s.name} span={24 / summaries.length}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginLeft: 30,
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'end' }}>
                                    <Title heading={3}>{s.value}</Title>
                                    <Text style={{ marginLeft: 5 }}>{s.unit}</Text>
                                </div>
                                <Title style={{ display: 'flex' }} heading={4} weight="bold">
                                    {s.name}
                                </Title>
                            </div>
                        </div>
                    </Col>
                );
            })}
        </Row>
    );
};

export default Index;
