import Content from '@components/page-content';
import './index.scss';

const Index = () => {
    return (
        <Content>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 300,
                    textAlign: 'center',
                }}
            >
                About
            </div>
        </Content>
    );
};

export default Index;
