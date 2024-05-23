import { FC, useEffect, useRef, useState } from 'react';
import {
    Avatar,
    TextArea,
    Input,
    InputGroup,
    Select,
    Button,
    Typography,
    Toast,
    RadioGroup,
    Radio,
} from '@douyinfe/semi-ui';
import MarkDown from '@components/markdown/comment';

import { AvatarOriginType } from '@src/common/model';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@src/hooks/useTypedSelector';
import { setVisitorInfo } from '@redux/slices/visitor/visitorSlice';
import { AvatarOriginTypeOpts } from '@src/common/select-options';

import './index.scss';

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
    isReply?: boolean;
    quote?: string;
    rows?: number;
    onSubmit?: (edit: CommentEditInput) => Promise<boolean> | boolean;
}

type Funcs = 'edit' | 'preview' | 'publish' | 'user';

const { Text } = Typography;

const Index: FC<ComProps> = ({ isReply = false, quote, rows = 4, onSubmit = () => false }) => {
    const dispatch = useDispatch();
    const visitor = useTypedSelector((state) => state.visitor);

    const [selectedFunc, setSelectedFunc] = useState<Funcs>('edit');

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
        return val || '';
    };

    const buildQuoteContent = () => {
        // console.log('quote 触发');
        if (quote) {
            // 换行替换程引用符号
            let quoteContent = quote.replace(new RegExp('\n', 'g'), '\n > ');
            quoteContent = quoteContent + '\n\n' + content || '';
            quoteContent = '> ' + quoteContent;
            setContent(quoteContent);
            // console.log('quote', quoteContent);
        }
    };

    const getInputRender = () => {
        if (selectedFunc == 'edit') {
            return (
                <TextArea
                    value={content}
                    onChange={setContent}
                    rows={rows}
                    showClear
                    maxLength={5000}
                    placeholder="支持markdown格式哟！"
                    style={{ height: '100%', resize: 'none' }}
                />
            );
        } else if (selectedFunc == 'preview') {
            return (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        backgroundColor: 'var(--semi-color-fill-0)',
                    }}
                >
                    <MarkDown style={{ padding: '5px 12px' }} content={content} />
                </div>
            );
        } else if (selectedFunc == 'user') {
            return (
                <div className="input-user-info">
                    <InputGroup className="avatar-origin-rg">
                        <Select
                            value={avatarOriginTypeRef.current}
                            onChange={(val) => {
                                avatarOriginTypeRef.current = val as number;
                                handleAvatarOriginChange(avatarOrigin ?? '');
                            }}
                            optionList={AvatarOriginTypeOpts}
                            style={{ width: 80 }}
                        />
                        <Input
                            value={avatarOrigin}
                            onChange={handleAvatarOriginChange}
                            placeholder="主要用于头像，必要时与您沟通之用！"
                        />
                    </InputGroup>
                    <Input
                        value={nickname}
                        onChange={setNickname}
                        maxLength={10}
                        style={{ marginTop: 10 }}
                        prefix="昵称"
                    />
                    <Input
                        value={email}
                        onChange={setEmail}
                        style={{ marginTop: 10 }}
                        prefix="邮箱"
                    />
                    <Button
                        onClick={() => handleVisitorInputConfirm()}
                        type="primary"
                        theme="solid"
                        style={{ marginTop: 10, float: 'right' }}
                    >
                        确定
                    </Button>
                </div>
            );
        }
    };

    const handleFuncSelected = (func: Funcs) => {
        if (func == 'publish') {
            handleSubmitInputClick();
            return;
        }

        setSelectedFunc(func);
    };

    useEffect(() => {
        buildQuoteContent();
        return () => {
            setContent('');
        };
    }, [quote]);

    useEffect(() => {
        buildQuoteContent();
        setAvatar(visitor.avatar);
        setAvatarOrigin(visitor.avatarOrigin);
        setNickname(visitor.nickname);
        setEmail(visitor.email);
        avatarOriginTypeRef.current = visitor.avatarOriginType ?? AvatarOriginType.Qq;
    }, []);

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
            default:
                avatar = val;
                break;
        }

        setAvatar(avatar);
    };

    const handleSubmitInputClick = () => {
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
        ).then((res) => {
            if (res === false) {
                return;
            }

            // 清空输入
            setContent('');
        });
    };

    const handleVisitorInputConfirm = () => {
        if (!nickname || nickname.length < 0) {
            Toast.warning('留个名呗');
            return;
        }
        //console.log(avatarOrigin);
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

        setSelectedFunc('edit');
    };

    return (
        <div className="comment-edit">
            <div className="comment-edit-func">
                <RadioGroup
                    //buttonSize="large"
                    value={selectedFunc}
                    onChange={(e) => handleFuncSelected(e.target.value)}
                    className="comment-edit-func-rg"
                    type="button"
                    defaultValue={'edit'}
                >
                    <Radio value={'edit'}>编辑</Radio>
                    <Radio value={'preview'}>预览</Radio>
                    <Radio value={'publish'}>发布</Radio>
                </RadioGroup>
                <div className="comment-edit-func-user" onClick={() => handleFuncSelected('user')}>
                    <Avatar className="comment-edit-func-user-avatar" size="small" src={avatar} />
                    <Text
                        ellipsis={true}
                        className={`comment-edit-func-user-name ${isReply ? 'is-reply' : ''}`}
                        strong
                    >
                        {nickname && nickname.length > 0 ? nickname : '汝'}
                    </Text>
                </div>
            </div>

            <div className="comment-edit-input">{getInputRender()}</div>

            {/* <Tabs
                size="small"
                type="button"
                contentStyle={{ padding: '5px 0 0 0' }}
                tabBarExtraContent={<Button onClick={() => handleSubmitInputClick()}> 发布</Button>}
            >
                <TabPane tab="编辑" itemKey="1">
                   
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

                <TabPane
                    tab={
                        <div className="comment-user">
                            <Avatar
                                className="comment-user-avatar"
                                size="small"
                                src={avatar}
                                //onClick={() => setVisitorInputVisible(true)}
                            />
                            <Text strong>{nickname && nickname.length > 0 ? nickname : '汝'}</Text>
                        </div>
                    }
                    itemKey="3"
                >
                    <div style={{ width: '300px' }}>
                        <InputGroup style={{ width: '100%', flexWrap: 'unset' }}>
                            <Select
                                value={avatarOriginTypeRef.current}
                                onChange={(val) => {
                                    avatarOriginTypeRef.current = val as number;
                                    handleAvatarOriginChange(avatarOrigin ?? '');
                                }}
                                optionList={AvatarOriginTypeOpts}
                            />
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
                </TabPane>
            </Tabs> */}
        </div>
    );
};

export default Index;
