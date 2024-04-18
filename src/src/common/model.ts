export interface PaginationRequest {
    size: number;
    page: number;
    sort?: string;
}

export interface PaginationResult<T> {
    items: Array<T>;
    total: number;
}

//#region 文章

export enum ArticleStatus {
    Draft = 0,
    Published = 1,
    Offline = 2,
}

export interface ArticlePageRequest extends PaginationRequest {
    title?: string;
    categoryId?: string;
    tagIds?: Array<string>;
    status?: ArticleStatus;
}

export interface ArticlePageModel {
    articleId: string; // 文章Id
    category: CategoryModel; // 分类
    title: string;
    description: string;
    tags: Array<TagModel>;
    status: ArticleStatus;
    banner: string;
    views: number;
    likes: number;
    isTop: boolean;
    commentable: boolean;
    publicable: boolean;
    createTime: Date;
}

//#endregion

//#region 分类

export interface CategoryModel {
    categoryId: string; // 分类Id
    name: string; // 分类名称
}

export interface CategoryWithArticleCountModel extends CategoryModel {
    articles: number;
}

//#endregion

//#region 标签

export interface TagModel {
    tagId: string; // 标签Id
    name: string; // 标签名称
    color: string; // 标签颜色
}

//#endregion

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
