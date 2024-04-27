import { FC } from 'react';
import { Col, Row, Typography } from '@douyinfe/semi-ui';

import './index.scss';

const { Text, Title } = Typography;

interface ComProps {}

interface Summary {
    name: string;
    value: number;
    unit: string;
}

const Index: FC<ComProps> = ({}) => {
    const summaries: Array<Summary> = [
        { name: '文章', value: 199, unit: '篇' },
        { name: '动态', value: 133, unit: '个' },
        { name: '友链', value: 177, unit: '个' },
    ];

    return (
        <div style={{ width: 500, margin: '0 20px' }}>
            <Row gutter={8}>
                {summaries.map((s) => {
                    return (
                        <Col key={s.name} span={24 / summaries.length}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'end' }}>
                                        <Title heading={3}>{s.value}</Title>
                                        <Text style={{ marginLeft: 5 }}>{s.unit}</Text>
                                    </div>
                                    <Title style={{ display: 'flex' }} heading={5} weight="medium">
                                        {s.name}
                                    </Title>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default Index;
