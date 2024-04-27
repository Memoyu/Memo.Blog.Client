import { CSSProperties, FC, ReactNode } from 'react';
import './index.scss';

interface ComProps {
    style?: CSSProperties;
    className?: string;
    children: ReactNode;
}

const Index: FC<ComProps> = ({ style, className, children }) => {
    return (
        <div style={style} className={`blog-container ${className}`}>
            {children}
        </div>
    );
};

export default Index;
