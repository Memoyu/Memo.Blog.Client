import { FC, ReactNode } from 'react';
import './index.scss';

interface ComProps {
    children: ReactNode;
}

const Index: FC<ComProps> = ({ children }) => {
    return <div className="blog-container">{children}</div>;
};

export default Index;
