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
} from '@douyinfe/semi-ui';
import MarkDown from '@components/markdown';

import './index.scss';
import { AvatarOriginType } from '@src/common/model';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@src/hooks/useTypedSelector';
import { setVisitorInfo } from '@redux/slices/visitor/visitorSlice';

export interface CommentEditInput {
    nickname: string;
    email?: string;
    avatar?: string;
    avatarOriginType: AvatarOriginType;
    avatarOrigin?: string;
    content: string;
    visitorId: string;
}

interface ComProps {
    quote?: string;
    rows?: number;
    onSubmit?: (edit: CommentEditInput) => Promise<boolean> | boolean;
}

const { Text } = Typography;

const Index: FC<ComProps> = ({ quote, rows = 4, onSubmit = () => false }) => {
    const dispatch = useDispatch();
    const visitor = useTypedSelector((state) => state.visitor);

    const [visitorInputVisible, setVisitorInputVisible] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>();
    const avatarOriginTypeRef = useRef<number>(1);
    const [avatarOrigin, setAvatarOrigin] = useState<string>();
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>();
    const [content, setContent] = useState<string>('');

    const getQqAvatar = (val?: string) => {
        const regQq = /[1-9][0-9]{4,11}/;
        if (!regQq.test(val ?? '')) return '';
        return `https://q1.qlogo.cn/g?b=qq&nk=${val}&s=100`;
    };

    const getGithubAvatar = (val?: string) => {
        return 'git';
    };

    const buildQuoteContent = () => {
        // console.log('quote 触发');
        if (quote) {
            // 换行替换程引用符号
            let quoteContent = quote.replace(new RegExp('\n', 'g'), '\n > ');
            quoteContent = quoteContent + '\n\n' + content || '';
            quoteContent = '> ' + quoteContent;
            setContent(quoteContent);
            console.log('quote', quoteContent);
        }
    };

    useEffect(() => {
        buildQuoteContent();
        setAvatar(visitor.avatar);
        setAvatarOrigin(visitor.avatarOrigin);
        setNickname(visitor.nickname);
        setEmail(visitor.email);
        avatarOriginTypeRef.current = visitor.avatarOriginType ?? AvatarOriginType.Qq;

        return () => {
            setContent('');
        };
    }, [quote]);

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

        setAvatar(avatar);
    };

    const handleSubmitInputClick = () => {
        // console.log(nickname);
        if (!nickname || nickname.length < 0) {
            Toast.warning('留个名呗');
            return;
        }

        if (!content || content.length < 0) {
            Toast.warning('说点什么呗，怪尴尬的');
            return;
        }

        Promise.resolve(
            onSubmit({
                nickname,
                email,
                avatar,
                avatarOriginType: avatarOriginTypeRef.current,
                avatarOrigin,
                content,
                visitorId: visitor.visitorId,
            })
        )
            .then((res) => {
                if (res === false) {
                    return;
                }

                // 清空输入
                setContent('');
            })
            .catch((error) => {
                // if user pass reject promise, no need to do anything
            });
    };

    const handleVisitorInputCancel = () => {};

    const handleVisitorInputConfirm = () => {
        if (!nickname || nickname.length < 0) {
            Toast.warning('留个名呗');
            return;
        }

        // 更新游客信息
        dispatch(
            setVisitorInfo({
                nickname,
                email,
                avatar,
                avatarOriginType: avatarOriginTypeRef.current,
                avatarOrigin,
            })
        );
    };

    return (
        <div className="moment-comment-edit-wrap">
            <div className="moment-comment-edit-wrap-user">
                <Popconfirm
                    icon={false}
                    title={false}
                    showCloseIcon={false}
                    visible={visitorInputVisible}
                    onVisibleChange={setVisitorInputVisible}
                    onCancel={() => handleVisitorInputCancel()}
                    onConfirm={() => handleVisitorInputConfirm()}
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
                    {/* flexShrink: 0 解决flex下头像变形问题 */}
                    <Avatar
                        style={{ margin: '0 15px', flexShrink: 0 }}
                        size="small"
                        src={avatar}
                        onClick={() => setVisitorInputVisible(true)}
                    />
                </Popconfirm>
                <Text style={{ marginTop: 5, maxWidth: 60, wordBreak: 'break-word' }} strong>
                    {nickname}
                </Text>
            </div>
            <div className="moment-comment-edit-wrap-content">
                <Tabs
                    type="button"
                    contentStyle={{ padding: '5px 0 0 0' }}
                    tabBarExtraContent={
                        <Button onClick={() => handleSubmitInputClick()}> 发布</Button>
                    }
                >
                    <TabPane tab="编辑" itemKey="1">
                        <TextArea
                            value={content}
                            onChange={setContent}
                            rows={rows}
                            maxLength={5000}
                            placeholder="支持markdown格式哟！"
                            style={{ resize: 'none' }}
                        />
                    </TabPane>
                    <TabPane tab="预览" itemKey="2">
                        <div
                            style={{
                                // width: '100%',
                                height: rows * 20 + 12, // 计算TextArea高度
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
    );
};

export default Index;
