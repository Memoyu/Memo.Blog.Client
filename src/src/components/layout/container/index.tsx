import { FC, ReactNode } from 'react';
import './index.scss';

interface ComProps {
    className?: string;
    children: ReactNode;
}

const Index: FC<ComProps> = ({ className, children }) => {
    return <div className={`blog-container ${className}`}>{children}</div>;
};

export default Index;
