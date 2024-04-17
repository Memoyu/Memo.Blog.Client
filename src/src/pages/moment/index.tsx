import PageBanner from '@components/page-banner';

import './index.scss';

const Index = () => {
    return (
        <div>
            <PageBanner
                height={400}
                image="http://oss.blog.memoyu.com/articles/banner/502a2248-2ee7-48eb-af67-c5b0b9a9a5f1.png"
            />
            <div>Moment</div>
        </div>
    );
};

export default Index;
