import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setMomentId } from '@redux/slices/moment/momentCommentSlice';

import './index.scss';
import { Space, TagGroup, Typography } from '@douyinfe/semi-ui';
import { IconComment, IconLikeHeart } from '@douyinfe/semi-icons';
import { TagProps } from '@douyinfe/semi-ui/lib/es/tag';
import { MomentModel } from '@src/common/model';

interface ComProps {
    moment: MomentModel;
}

const { Text } = Typography;

const Index: FC<ComProps> = ({ moment }) => {
    const dispatch = useDispatch();

    const handleReplyMomentClick = (moment: MomentModel) => {
        dispatch(setMomentId(moment.momentId));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Space spacing="tight">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <IconLikeHeart /> <Text style={{ marginLeft: 3 }}>{moment.likes}</Text>
                        </div>
                        {moment.commentable && (
                            <div
                                style={{
                                    marginLeft: 15,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={() => handleReplyMomentClick(moment)}
                            >
                                <IconComment />
                                <Text style={{ marginLeft: 3 }}>{moment.comments}</Text>
                            </div>
                        )}
                    </div>
                </Space>
                <TagGroup
                    maxTagCount={4}
                    tagList={moment.tags.map((t, idx) => {
                        return {
                            tagKey: idx,
                            color: 'purple',
                            children: t,
                        } as TagProps;
                    })}
                    size="large"
                    showPopover
                />
            </div>
        </div>
    );
};

export default Index;
