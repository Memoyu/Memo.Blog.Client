import React, { ReactNode } from 'react';
import { format } from 'date-fns';
import { IconPaperclip, IconComment } from '@douyinfe/semi-icons';
import { Avatar, Space, Tag, Tooltip, Typography } from '@douyinfe/semi-ui';

import MarkDown from '@components/markdown';

import { dateDiff } from '@utils/date';

import './index.scss';
import { CommentModel } from '@src/common/model';

type Props = {
    comment: CommentModel;
};

const { Text } = Typography;

const CommentItem: React.FC<Props> = ({ comment }) => {
    const getCommentTemplateRender = (ct: CommentModel, isTop: boolean = true) => (
        <div className="moment-comment-item">
            {/* flexShrink: 0 解决flex下头像变形问题 */}
            <Avatar style={{ margin: '0 20px', flexShrink: 0 }} size="small" src={ct.avatar} />
            <div className="moment-comment-item-box">
                <div className="moment-comment-item-box-info">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Space spacing="tight" style={{ display: 'flex', alignItems: 'baseline' }}>
                            {isTop && <Text strong>#{ct.layer}楼</Text>}
                            <div className="name">{ct.nickname}</div>
                            <Text>{format(new Date(ct.createTime), 'yyyy-MM-dd HH:mm')}</Text>
                            <Tag size="large" color="violet">
                                {dateDiff(new Date(ct.createTime))}
                            </Tag>
                        </Space>

                        <Tooltip content="回复">
                            <IconComment style={{ marginLeft: 20 }} />
                        </Tooltip>
                        <Tooltip content="引用">
                            <IconPaperclip style={{ marginLeft: 10 }} />
                        </Tooltip>
                    </div>
                </div>
                <div className="moment-comment-item-box-content">
                    <MarkDown content={ct.content} />
                </div>
                {ct.childs && ct.childs.length > 0 && (
                    <div className="moment-comment-item-box-childs">
                        {ct.childs.map((c) => (
                            <div className="moment-comment-item-box-childs-box">
                                {getCommentTemplateRender(c, false)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return getCommentTemplateRender(comment);
};

export default CommentItem;
