import { FC, useRef, useState } from 'react';
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
} from '@douyinfe/semi-ui';

import './index.scss';

interface ComProps {}

const { Text } = Typography;

const Index: FC<ComProps> = ({}) => {
    const [avatar, setAvatar] = useState<string>();
    const avatarOriginTypeRef = useRef<number>(0);
    const [avatarOrigin, setAvatarOrigin] = useState<string>();
    const [nickname, setNickname] = useState<string>();
    const [email, setEmail] = useState<string>();

    const getQqAvatar = (val?: string) => {
        const regQq = /[1-9][0-9]{4,11}/;
        if (!regQq.test(val ?? '')) return '';
        return `https://q1.qlogo.cn/g?b=qq&nk=${val}&s=100`;
    };

    const getGithubAvatar = (val?: string) => {
        return 'git';
    };

    // 头像来源输入变更
    const handleAvatarOriginChange = (val: string) => {
        setAvatarOrigin(val);

        let avatar = '';
        switch (avatarOriginTypeRef.current) {
            case 0:
                avatar = getQqAvatar(val);
                break;
            case 1:
                avatar = getGithubAvatar(val);
                break;
        }
        console.log(avatarOriginTypeRef.current);
        console.log(avatar);

        setAvatar(avatar);
    };

    return (
        <div className="moment-comment-edit-wrap">
            {/* flexShrink: 0 解决flex下头像变形问题 */}
            <div className="moment-comment-edit-wrap-user">
                <Popconfirm
                    icon={false}
                    title={false}
                    showCloseIcon={false}
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
                                    <Select.Option value={0}>QQ</Select.Option>
                                    <Select.Option value={1}>GitHub</Select.Option>
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
                    <Avatar style={{ margin: '0 20px', flexShrink: 0 }} size="small" src={avatar} />
                </Popconfirm>
                <Text style={{ marginTop: 5, maxWidth: 60, wordBreak: 'break-word' }} strong>
                    燕过留名
                </Text>
            </div>
            <div className="moment-comment-edit-wrap-box">
                <Tabs type="button" tabBarExtraContent={<Button> 发布</Button>}>
                    <TabPane tab="编辑" itemKey="1">
                        <TextArea maxLength={100} style={{ resize: 'none' }} />
                    </TabPane>
                    <TabPane tab="预览" itemKey="2">
                        <TextArea style={{ resize: 'none' }} disabled />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Index;
