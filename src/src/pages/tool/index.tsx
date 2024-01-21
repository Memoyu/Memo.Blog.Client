import React from 'react';
import type { CSSProperties } from 'react';
import type { CollapseProps } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Col, Row } from 'antd';
import s from './index.module.scss';

const Tool = () => {
  const cols = [];
  for (let i = 0; i < 20; i++) {
    cols.push(
      <Col key={i.toString()} span={4}>
        <div>Column</div>
      </Col>
    );
  }

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: 'gitmoji 🤔',
      children: <Row gutter={24}></Row>,
      style: panelStyle
    }
  ];

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    border: 'none'
  };
  return (
    <div className={s.container}>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: '#FFFFFF' }}
        items={getItems(panelStyle)}
      />
    </div>
  );
};

export default Tool;
