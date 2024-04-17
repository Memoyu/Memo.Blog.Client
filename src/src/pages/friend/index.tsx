import PageBanner from '@components/page-banner';

import './index.scss';

const Index = () => {
    return (
        <div>
            <PageBanner
                height={400}
                image="http://oss.blog.memoyu.com/articles/bdbb6831-bccb-4139-96c7-b85395038d5e.png"
            />
            <div>Friend</div>
        </div>
    );
};

export default Index;
