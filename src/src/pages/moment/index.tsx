import PageContainer from '@src/components/layout/page-container';
import ContentContainer from '@src/components/layout/content-container';
import PageBanner from '@components/page-banner';
import MomentList from './components/moment-list';

import { usePageVisit } from '@src/hooks/usePageVisit';
import { useConfig } from '@src/stores';

import './index.scss';

const Index = () => {
    const height = 1200;

    usePageVisit();
    const momentBanner = useConfig((state) => state.banner.moment);

    return (
        <PageContainer>
            <PageBanner
                banner={momentBanner}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
            <ContentContainer className="moment-section">
                <MomentList height={height} />
            </ContentContainer>
        </PageContainer>
    );
};

export default Index;
