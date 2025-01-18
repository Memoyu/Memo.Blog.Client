import { FC, useEffect, useState } from 'react';
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

import { useVisitor } from '@src/stores';

import { AvatarOriginType } from '@src/common/model';
import { AvatarOriginTypeOpts } from '@src/common/select-options';

import './index.scss';
import { shallow } from 'zustand/shallow';

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
    clearQuote?: () => void; // 主要用于清空引用文本，多次点击引用
    onSubmit?: (edit: CommentEditInput) => Promise<boolean> | boolean;
}

type Funcs = 'edit' | 'preview' | 'publish' | 'user';

const { Text } = Typography;

const Index: FC<ComProps> = ({ isReply = false, quote, clearQuote, onSubmit = () => false }) => {
    const visitor = useVisitor((state) => state, shallow);
    const setVisitor = useVisitor((state) => state.setVisitor);

    const [selectedFunc, setSelectedFunc] = useState<Funcs>('edit');

    const [avatar, setAvatar] = useState<string>();
    const [avatarOriginType, setAvatarOriginType] = useState<number>(1);
    const [avatarOrigin, setAvatarOrigin] = useState<string>();
    const [nickname, setNickname] = useState<string>();
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
        // console.log('quote 触发', quote);
        if (quote) {
            // console.log('拼接', quote);
            // 换行替换程引用符号
            let quoteContent = quote.replace(new RegExp('\n', 'g'), '\n > ');
            quoteContent = quoteContent + '\n\n' + content || '';
            quoteContent = '> ' + quoteContent;
            setContent(quoteContent);
            // console.log('quote', quoteContent);
        }
        clearQuote && clearQuote();
    };

    const getInputRender = () => {
        if (selectedFunc == 'edit') {
            return (
                <div style={{ height: '100%', overflow: 'auto' }}>
                    <TextArea
                        value={content}
                        onChange={setContent}
                        rows={8}
                        showClear
                        maxLength={5000}
                        placeholder="支持markdown格式哟！"
                        autosize
                    />
                </div>
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
                    <MarkDown content={content} />
                </div>
            );
        } else if (selectedFunc == 'user') {
            return (
                <div className="input-user-info">
                    <InputGroup className="avatar-origin-rg">
                        <Select
                            value={avatarOriginType}
                            onChange={(val) => handleAvatarOriginChange(val, avatarOrigin ?? '')}
                            optionList={AvatarOriginTypeOpts}
                            style={{ width: 80 }}
                        />
                        <Input
                            value={avatarOrigin}
                            onChange={(val) => handleAvatarOriginChange(avatarOriginType, val)}
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
    }, [quote]);

    useEffect(() => {
        buildQuoteContent();
        setAvatar(visitor.avatar);
        setAvatarOrigin(visitor.avatarOrigin);
        setNickname(visitor.nickname);
        setEmail(visitor.email);
        setAvatarOriginType(visitor.avatarOriginType ?? AvatarOriginType.Qq);
    }, []);

    // 头像来源输入变更
    const handleAvatarOriginChange = (type: any, val: string) => {
        setAvatarOrigin(val);
        setAvatarOriginType(type);

        let avatar = '';
        switch (avatarOriginType) {
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
                avatarOriginType: avatarOriginType,
                avatarOrigin,
                content,
                visitorId: visitor.visitorId!,
            })
        ).then((res) => {
            if (res === false) return;

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
        setVisitor({
            nickname,
            email,
            avatar,
            avatarOriginType: avatarOriginType,
            avatarOrigin,
        });

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
        </div>
    );
};

export default Index;
