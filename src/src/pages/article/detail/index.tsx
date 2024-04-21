import React from 'react';
import { useState, useEffect } from 'react';
import MarkDown from '../../../components/markdown';
import Navigation from '../components/navigation';
import Comment from '../components/comment';

import { Tag, Space } from '@douyinfe/semi-ui';
import './index.scss';

const Index = () => {
    const [md, setMd] = useState('loading......');
    const [comments, setComments] = useState();
    useEffect(() => {}, [md]);

    const data = {
        author: 'memoyu',
        title: '文章的标题',
        date: '2023-07-21 19:30:40',
        desc: '前言：本次的教程与上次的基于 WePY 2.x 平台下使用 ECharts方式基本一致，毕竟目标平台都是微信小程序而已（别的平台未测试），只是就是多了一个参数而已。',
        tags: ['UNI-APP', 'echarts', 'mbill'],
    };

    return (
        <div>
            <div className="article-header">
                <div className="article-header-background-img">
                    <img src="https://images.unsplash.com/photo-1550613097-fe6c2c321cd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" />
                </div>
                <div className="article-header-content">
                    <div className="article-header-content-title">{data.title}</div>
                    <Space wrap>
                        <Tag color="indigo">作者：{data.author}</Tag>
                        <Tag color="indigo">时间：{data.date}</Tag>
                    </Space>
                    <div className="article-header-content-desc">{data.desc}</div>
                </div>
            </div>
            <div className="article-content">
                <Space wrap>
                    {data.tags.map((item) => (
                        <Tag color="light-green" key={item}>
                            {item}
                        </Tag>
                    ))}
                </Space>
                <div className="article-content-markdown">
                    <MarkDown content={md} />
                    <Navigation content={md} />
                </div>
                <Comment comments={comments} />
            </div>
        </div>
    );
};

export default Index;
