import { Image } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';

import Content from '@components/page-content';
import './index.scss';

const Home = () => {
    const postListVar = {
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                when: 'afterChildren',
            },
        },
    };

    const postListItemVar = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 },
    };

    const imgListVar = {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: 100 },
    };
    return (
        <Content>
            <div></div>
        </Content>
    );
};

export default Home;
