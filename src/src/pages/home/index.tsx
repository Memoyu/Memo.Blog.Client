import { Button, Image } from '@douyinfe/semi-ui';
import { Link, useNavigate } from 'react-router-dom';

import PageBanner from '@components/page-banner';

import './index.scss';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <PageBanner image="https://static.bh-lay.com/build/single-page-vue/assets/architecture-b3-2-676c2e0a.jpg" />
            <div style={{ height: 200, backgroundColor: 'red' }}></div>
            <div style={{ height: 300, backgroundColor: 'blue' }}></div>
            <div style={{ height: 400, backgroundColor: 'purple' }}></div>
            <div style={{ height: 500, backgroundColor: 'yellow' }}></div>
            <div style={{ height: 600, backgroundColor: 'green' }}></div>
            <div style={{ height: 700, backgroundColor: 'rosybrown' }}></div>
        </div>
    );
};

export default Home;
