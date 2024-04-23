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
    categoryId?: string;
    tagIds?: Array<string>;
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

export interface ArticleModel {
    articleId: string; // 文章Id
    category: CategoryModel; // 分类
    title: string;
    description: string;
    tags: Array<TagModel>;
    content: string;
    banner: string;
    status: ArticleStatus;
    wordNumber: number;
    readingTime: number;
    views: number;
    likes: number;
    isTop: boolean;
    commentable: boolean;
    publicable: boolean;
    author: ArticleAuthorModel;
    createTime: Date;
}

export interface ArticleAuthorModel {
    userId: string;
    nickname: string;
    avatar: string;
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

//#region 开源项目

export interface OpenSourceProjectModel {
    projectId: string;
    title: string;
    description: string;
    imageUrl: string;
    readmeUrl: string;
    htmlUrl: string;
    star: number;
    fork: number;
}

//#endregion

//#region 动态

export interface MomentPageRequest extends PaginationRequest {}

export interface MomentAnnouncerModel {
    userId: string;
    nickname: string;
    avatar: string;
}

export interface MomentModel {
    momentId: string;
    tags: Array<string>;
    content: string;
    likes: number;
    showable: boolean;
    commentable: boolean;
    createTime: Date;
    announcer: MomentAnnouncerModel;
}

//#endregion

//#region 关于我

export interface AboutModel {
    title: string;
    banner: string;
    tags: Array<string>;
    content: string;
    commentable: boolean;
}

//#endregion

//#region 评论

export enum CommentType {
    Article = 0,
    Moment = 1,
    About = 2,
}

export interface CommentPageRequest extends PaginationRequest {
    commentType: CommentType;
    belongId?: string;
}

export interface CommentModel {
    commentId: string;
    nickname: string;
    email: string;
    content: string;
    avatar: string;
    region: string;
    createTime: Date;
    layer: number;
    childs?: Array<CommentModel>;
}

//#endregion
