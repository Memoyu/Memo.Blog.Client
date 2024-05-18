import { FC } from 'react';
import { Empty, Button } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';
import { IllustrationNotFound } from '@douyinfe/semi-illustrations';
import PageContainer from '../layout/page-container';

interface Iprops {
    title?: string;
    description?: string;
}

const Index: FC<Iprops> = ({ title, description }) => {
    const navigate = useNavigate();
    return (
        <PageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Empty
                image={<IllustrationNotFound style={{ width: 150, height: 150 }} />}
                title={title}
                description={description}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Button
                    style={{ padding: '6px 24px', width: ' 180px' }}
                    theme="solid"
                    type="primary"
                    onClick={() => navigate(`/dashboard`, { replace: true })}
                >
                    {'回到首页'}
                </Button>
            </Empty>
        </PageContainer>
    );
};

export default Index;
