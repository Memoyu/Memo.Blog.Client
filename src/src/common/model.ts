export interface ArticleModel {
    articleId: string;
    title: string;
    banner: string;
}

export interface CommentBelongModel {
    belongId: string;
    title: string;
    link: string;
}

export interface CommentModel {
    commentId: string;
    belong: CommentBelongModel;
    commentType: number;
    nickname: string;
    email: string;
    content: string;
    avatar: string;
    avatarOriginType: number;
    avatarOrigin: string;
    ip: string;
    region: string;
    showable: boolean;
    createTime: Date;
}
