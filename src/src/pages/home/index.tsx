import { Button, Image } from '@douyinfe/semi-ui';
import { Link, useNavigate } from 'react-router-dom';

import Content from '@components/page-content';
import './index.scss';

const Home = () => {
    const navigate = useNavigate();
    return (
        <Content>
            <article>
                <h1
                    style={
                        {
                            '--base-width': '24vw',
                            top: '-18vw',
                            letterSpacing: '-1.4vw',
                            x: '-50%',
                        } as any
                    }
                >
                    eee
                </h1>
                <ul>
                    <li>
                        <Link to="/git-moji">git moji</Link>
                    </li>
                    <li>
                        <Link to="/article">article</Link>
                    </li>
                    <Button onClick={() => navigate('/git-moji')}>to git moji</Button>
                </ul>
            </article>
        </Content>
    );
};

export default Home;
