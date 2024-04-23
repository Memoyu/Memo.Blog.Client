import { FC, useEffect, useRef, useState } from 'react';
import {
    Avatar,
    TextArea,
    Tabs,
    TabPane,
    Input,
    InputGroup,
    Select,
    Button,
    Typography,
    Popconfirm,
    Toast,
    Banner,
} from '@douyinfe/semi-ui';
import MarkDown from '@components/markdown';

import './index.scss';
import { commentCreate } from '@src/utils/request';
import { CommentModel, CommentType } from '@src/common/model';

interface ComProps {
    reply?: CommentModel;
    quote?: CommentModel;
    onCreateSuccess?: () => void;
}

const { Text } = Typography;

const Index: FC<ComProps> = ({ reply, quote, onCreateSuccess }) => {
    const [userInputVisible, setUserInputVisible] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>();
    const avatarOriginTypeRef = useRef<number>(1);
    const [avatarOrigin, setAvatarOrigin] = useState<string>();
    const [nickname, setNickname] = useState<string>();
    const [email, setEmail] = useState<string>();

    const [content, setContent] = useState<string>();

    const [relaReply, setRelaReply] = useState<CommentModel>();
    const [relaQuote, setRelaQuote] = useState<CommentModel>();

    const getQqAvatar = (val?: string) => {
        const regQq = /[1-9][0-9]{4,11}/;
        if (!regQq.test(val ?? '')) return '';
        return `https://q1.qlogo.cn/g?b=qq&nk=${val}&s=100`;
    };

    const getGithubAvatar = (val?: string) => {
        return 'git';
    };

    useEffect(() => {
        console.log(reply);
        setRelaReply(reply);
        setRelaQuote(quote);
    }, [reply, quote]);

    // 头像来源输入变更
    const handleAvatarOriginChange = (val: string) => {
        setAvatarOrigin(val);

        let avatar = '';
        switch (avatarOriginTypeRef.current) {
            case 1:
                avatar = getQqAvatar(val);
                break;
            case 2:
                avatar = getGithubAvatar(val);
                break;
        }
        // console.log(avatarOriginTypeRef.current);
        // console.log(avatar);

        setAvatar(avatar);
    };

    const handleAddCommentClick = () => {
        console.log(nickname);
        if (!nickname || nickname.length < 0) {
            Toast.warning('留个名呗');
            setUserInputVisible(true);
            return;
        }

        if (!content || content.length < 0) {
            Toast.warning('说点什么呗，怪尴尬的');
            return;
        }

        commentCreate({
            nickname,
            content,
            commentType: CommentType.Moment,
            belongId: 0,
            email,
            avatar,
            avatarOrigin,
            avatarOriginType: avatarOriginTypeRef.current,
        }).then((res) => {
            if (!res.isSuccess) {
                Toast.error(res.message);
                return;
            }
            onCreateSuccess && onCreateSuccess();
        });
    };

    const handleUserInputCancel = () => {
        avatarOriginTypeRef.current = 1;
        setAvatar('');
        setAvatarOrigin('');
        setNickname('');
        setEmail('');
    };
    return (
        <div className="moment-comment-edit-wrap">
            {/* flexShrink: 0 解决flex下头像变形问题 */}
            <div className="moment-comment-edit-box">
                <div className="moment-comment-edit-box-user">
                    <Popconfirm
                        icon={false}
                        title={false}
                        showCloseIcon={false}
                        visible={userInputVisible}
                        onVisibleChange={setUserInputVisible}
                        onCancel={(v) => handleUserInputCancel()}
                        content={
                            <div>
                                <InputGroup style={{ width: '100%', flexWrap: 'unset' }}>
                                    <Select
                                        value={avatarOriginTypeRef.current}
                                        onChange={(val) => {
                                            avatarOriginTypeRef.current = val as number;
                                            handleAvatarOriginChange(avatarOrigin ?? '');
                                        }}
                                    >
                                        <Select.Option value={1}>QQ</Select.Option>
                                        <Select.Option value={2}>GitHub</Select.Option>
                                    </Select>
                                    <Input
                                        value={avatarOrigin}
                                        onChange={handleAvatarOriginChange}
                                        placeholder="主要用于头像，必要时与您沟通之用！"
                                        style={{ width: '100%' }}
                                    />
                                </InputGroup>
                                <Input
                                    value={nickname}
                                    onChange={setNickname}
                                    style={{ marginTop: 10 }}
                                    prefix="昵称"
                                />
                                <Input
                                    value={email}
                                    onChange={setEmail}
                                    style={{ marginTop: 10 }}
                                    prefix="邮箱"
                                />
                            </div>
                        }
                    >
                        <Avatar
                            style={{ margin: '0 20px', flexShrink: 0 }}
                            size="small"
                            src={avatar}
                            onClick={() => setUserInputVisible(true)}
                        />
                    </Popconfirm>
                    <Text style={{ marginTop: 5, maxWidth: 60, wordBreak: 'break-word' }} strong>
                        燕过留名
                    </Text>
                </div>
                <div className="moment-comment-edit-box-content">
                    <Tabs
                        type="button"
                        tabBarExtraContent={
                            <Button onClick={() => handleAddCommentClick()}> 发布</Button>
                        }
                    >
                        <TabPane tab="编辑" itemKey="1">
                            <TextArea
                                value={content}
                                onChange={setContent}
                                maxLength={1000}
                                placeholder="支持markdown格式哟！"
                                style={{ resize: 'none', height: 100 }}
                            />
                        </TabPane>
                        <TabPane tab="预览" itemKey="2">
                            <div
                                style={{
                                    height: 100,
                                    overflow: 'auto',
                                    backgroundColor: 'var(--semi-color-fill-0)',
                                }}
                            >
                                <MarkDown style={{ padding: '5px 12px' }} content={content} />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            <Banner
                style={{ padding: 5 }}
                type="info"
                description={
                    <Text ellipsis={{ showTooltip: true }} style={{ width: 100 }}>
                        {relaReply?.content}
                    </Text>
                }
            />
        </div>
    );
};

export default Index;
