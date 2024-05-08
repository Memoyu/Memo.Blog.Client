import { CSSProperties, FC, ReactNode } from 'react';
import './index.scss';
import Footer from '../footer';

interface ComProps {
    style?: CSSProperties;
    className?: string;
    children: ReactNode;
}

const Index: FC<ComProps> = ({ style, className, children }) => {
    return (
        <>
            <div style={style} className={`blog-page-container ${className ?? ''}`}>
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Index;
