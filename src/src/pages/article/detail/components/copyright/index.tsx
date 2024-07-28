import { FC, useEffect, useState } from 'react';
import { Button, Space, Tag, Toast, Tooltip, Typography } from '@douyinfe/semi-ui';
import { IconLikeHeart, IconComment, IconPhoneStroke } from '@douyinfe/semi-icons';
import { QRCodeCanvas } from 'qrcode.react';

import { useArticleDetail } from '@src/stores';

import { articleLike } from '@src/utils/request';

import { ArticleModel } from '@src/common/model';

import './index.scss';

interface ComProps {
    article: ArticleModel;
}

const webSite = import.meta.env.VITE_WEB_SITE;

const { Text, Paragraph } = Typography;

const Index: FC<ComProps> = ({ article }) => {
    const comments = useArticleDetail((state) => state.commentTotal);
    const setCommentTotal = useArticleDetail((state) => state.setCommentTotal);

    const [isLike, setIsLike] = useState<boolean>();
    const [likes, setLikes] = useState<number>(0);
    const [shareUrl, setShareUrl] = useState<string>('');

    const handleArticleLikeClick = (id: string) => {
        if (isLike) return;

        articleLike(id).then((res) => {
            if (!res.isSuccess) {
                Toast.error(res.message);
                return;
            }
            setIsLike(true);
            setLikes((old) => old + 1);
        });
    };

    useEffect(() => {
        setIsLike(article.isLike);
        setLikes(article.likes);
        setShareUrl(`${webSite}article/detail/${article.articleId}`);
        setCommentTotal(article.comments);
    }, [article]);

    return (
        <div className="article-copyright">
            {/* 分类 */}
            <div className="category-wrap">
                <div style={{ fontWeight: 'bold', width: 60 }}>分类：</div>
                <Text strong style={{ color: 'var(--semi-color-primary)' }}>
                    {article.category.name}
                </Text>
            </div>

            {/* 标签列表 */}
            <div className="tag-list-wrap">
                <div style={{ fontWeight: 'bold', width: 60 }}>标签：</div>
                <Space
                    wrap
                    style={{
                        width: '100%',
                        padding: '13px 0',
                    }}
                >
                    {article.tags?.map((item) => (
                        <Tag
                            key={item.tagId}
                            style={{
                                fontWeight: 'bold',
                                padding: '14px 14px',
                                color: 'var(--semi-color-primary)',
                            }}
                        >
                            {item.name}
                        </Tag>
                    ))}
                </Space>
            </div>

            {/* 转载注明 */}
            <div className="copyright-wrap">
                <div className="copyright-wrap-title">转载请注明来源：</div>
                <Paragraph
                    className="copyright-wrap-link"
                    ellipsis={{ pos: 'middle' }}
                    copyable={{
                        successTip: false,
                        onCopy: () => {
                            Toast.success('复制成功！');
                        },
                    }}
                >
                    {shareUrl}
                </Paragraph>
            </div>

            {/* 文章操作 */}
            <div className="like-wrap">
                {/* 评论 */}
                <Button type="primary" theme="solid" icon={<IconComment />}>
                    {comments}
                </Button>

                {/* 点赞 */}
                <Button
                    type="primary"
                    theme="solid"
                    icon={
                        <IconLikeHeart
                            style={{
                                color: isLike
                                    ? 'rgba(var(--semi-red-6), 1)'
                                    : 'rgba(var(--semi-white), 1)',
                            }}
                        />
                    }
                    onClick={() => handleArticleLikeClick(article.articleId)}
                >
                    {likes}
                </Button>

                {/* 文章二维码 */}
                <div className="site-qrcode">
                    <Tooltip
                        content={
                            <div>
                                <QRCodeCanvas
                                    id="qrCode"
                                    value={shareUrl}
                                    size={128}
                                    imageSettings={{
                                        excavate: true,
                                        x: undefined,
                                        y: undefined,
                                        src: 'http://oss.blog.memoyu.com/account/avatar/fbca90ce-9197-4a00-8836-eaafef3e0fe2.png',
                                        width: 30,
                                        height: 30,
                                    }}
                                    style={{ width: 96, height: 96 }}
                                />
                            </div>
                        }
                    >
                        <Button type="primary" theme="solid" icon={<IconPhoneStroke />} />
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default Index;
