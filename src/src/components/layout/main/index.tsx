import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import FallbackLoading from '@/components/fallback-loading';
import routes from '@/router';
import s from './index.module.scss';
import { Layout } from 'antd';

const { Content } = Layout;

const Main: React.FC = () => {
  const elements = useRoutes(routes);
  return (
    <Content className={s.main}>
      {/* fallback={<FallbackLoading message="正在加载中" />} */}
      <Suspense>{elements}</Suspense>
    </Content>
  );
};

export default Main;
