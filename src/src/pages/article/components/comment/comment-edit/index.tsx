import React, { Ref, useState } from 'react';
import { Tooltip, Input, Space, Button, TextArea } from '@douyinfe/semi-ui';
import './index.scss';

const CommentEdit: React.FC = () => {
    const [avatar, setAvatar] = useState(require('@/assets/images/avatar/default.png'));
    const [avatarSelectVisible, setAvatarSelectVisible] = useState(false);
    const [qq, setQq] = useState('');
    const [github, setGithub] = useState('');

    const handleAvatarClick = () => {
        setAvatarSelectVisible(true);
    };

    const handleQqInputPressEnter = () => {
        setQqAvatar();
        setAvatarSelectVisible(false);
    };

    const handleGithubInputPressEnter = () => {
        setGithubAvatar();
    };

    const handleAvatarSelectOpenChange = () => {
        // qqInput.current?.focus();
    };

    const setQqAvatar = () => {
        const regQq = /[1-9][0-9]{4,11}/;
        if (regQq.test(qq!)) {
            setAvatar(`https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=100`);
        }
    };

    const setGithubAvatar = () => {
        const regQq = /[1-9][0-9]{4,11}/;
        if (regQq.test(qq!)) {
            setAvatar(`https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=100`);
        }
    };

    return (
        <div>
            <div className="article-comment-edit">
                <div className="article-comment-edit-user">
                    <div className="article-comment-edit-avatar-box">
                        <Tooltip
                            style={{ backgroundColor: 'white' }}
                            //trigger="click"
                            open={avatarSelectVisible}
                            onOpenChange={handleAvatarSelectOpenChange}
                            title={
                                <Space vertical>
                                    {/* <Input
                                        ref={qqInput}
                                        prefix="QQ头像："
                                        autoFocus
                                        value={qq}
                                        onChange={(e) => setQq(e.target.value)}
                                        onPressEnter={handleQqInputPressEnter}
                                    />
                                    <Input
                                        ref={qqInput}
                                        prefix="Github："
                                        autoFocus
                                        value={qq}
                                        onChange={(e) => setGithub(e.target.value)}
                                        onPressEnter={handleGithubInputPressEnter}
                                    /> */}
                                </Space>
                            }
                        >
                            <img
                                className="article-comment-edit-avatar-box-avatar"
                                src={avatar}
                                onClick={handleAvatarClick}
                            />
                        </Tooltip>
                    </div>
                    <Input className="article-comment-edit-input-info" placeholder={'昵称'}></Input>
                    <Input
                        className="article-comment-edit-input-info"
                        placeholder={'邮箱(选填)'}
                    ></Input>
                </div>
                <TextArea
                    className="article-comment-edit-textarea"
                    maxLength={100}
                    style={{ resize: 'none' }}
                />
                <div className="article-comment-edit-btns">
                    {/* <div className={s.functionBtns}>
                        <Button icon={<SmileOutlined />} aria-label="emoji" />
                    </div>
                    <div className={s.operateBtns}>
                        <Button icon={<FireOutlined />} className={s.itemBtn} aria-label="emoji">
                            预览
                        </Button>
                        <Button icon={<MessageOutlined />} className={s.itemBtn} aria-label="emoji">
                            发送
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default CommentEdit;
