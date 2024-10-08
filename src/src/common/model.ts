export interface PaginationRequest {
    size: number;
    page: number;
    sort?: string;
}

export interface PaginationResult<T> {
    items: Array<T>;
    total: number;
}

//#region 配置

export interface ConfigModel {
    banner: BannerConfigModel;
    color: ColorConfigModel;
}

export interface BannerConfigModel {
    home: BannerInfoModel;
    article: BannerInfoModel;
    lab: BannerInfoModel;
    moment: BannerInfoModel;
    about: BannerInfoModel;
}

export interface BannerInfoModel {
    url?: string;
    title?: string;
    originUrl?: string;
}

export interface ColorConfigModel {
    primary: Array<string>;
    secondary: Array<string>;
    tertiary: Array<string>;
}

export interface ColorVariableModel {
    primaryColor: string;
    primaryHover: string;
    primaryActive: string;
    primaryDisabled: string;
    primaryLightDefault: string;
    primaryLightHover: string;
    primaryLightActive: string;

    secondaryColor: string;
    secondaryHover: string;
    secondaryActive: string;
    secondaryDisabled: string;
    secondaryLightDefault: string;
    secondaryLightHover: string;
    secondaryLightActive: string;

    tertiaryColor: string;
    tertiaryHover: string;
    tertiaryActive: string;
    tertiaryLightDefault: string;
    tertiaryLightHover: string;
    tertiaryLightActive: string;
}

//#endregion

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
    comments: number;
    isTop: boolean;
    commentable: boolean;
    publicable: boolean;
    isLike: boolean;
    publishTime?: Date;
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
    comments: number;
    isTop: boolean;
    commentable: boolean;
    publicable: boolean;
    isLike: boolean;
    author: ArticleAuthorModel;
    // createTime: Date;
    publishTime?: Date;
}

export interface ArticleAuthorModel {
    userId: string;
    nickname: string;
    avatar: string;
}

export interface ArticleSummaryModel {
    articles: number;
    comments: number;
    moments: number;
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
    comments: number;
    commentable: boolean; // 是否开放评论
    createTime: Date;
    announcer: MomentAnnouncerModel; // 发布者
    isLike: boolean; // 是否已点过赞
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

//#region 友链

export interface FriendModel {
    friendId: string;
    nickname: string;
    description: string;
    site: string;
    avatar: string;
}

//#endregion

//#region 评论

export enum AvatarOriginType {
    Unknown = 0,
    Qq = 1,
    Github = 2,
    Upload = 3,
}

export enum CommentType {
    Article = 0,
    Moment = 1,
    About = 2,
}

export interface CommentEditRequest {
    parentId?: string;
    replyId?: string;
    content: string;
    commentType: CommentType;
    belongId: string;
}

export interface CommentPageRequest extends PaginationRequest {
    commentType: CommentType;
    belongId?: string;
}

export interface CommentReplyModel {
    commentId: string;
    nickname: string;
    content: string;
    createTime: Date;
    floor: number;
    floorString: string;
}

export interface CommentModel {
    parentId?: string;
    commentId: string;
    belongId: string;
    content: string;
    region: string;
    createTime: Date;
    floor: number;
    floorString: string;
    childs?: Array<CommentModel>;
    reply?: CommentReplyModel;
    visitor: VisitorModel;
}

//#endregion

//#region 访客信息

export interface SetVisitorStateModel {
    nickname: string;
    email?: string;
    avatar?: string;
    avatarOriginType?: AvatarOriginType;
    avatarOrigin?: string;
}

export interface VisitorEditRequest {
    nickname?: string;
    email?: string;
    avatar?: string;
    avatarOriginType?: AvatarOriginType;
    avatarOrigin?: string;
}

export interface VisitorModel {
    visitorId: string;
    nickname: string;
    email?: string;
    avatar?: string;
    avatarOriginType?: AvatarOriginType;
    avatarOrigin?: string;
}

export interface VisitorLogEditRequest {
    path: string;
    visitedId?: string;
    os?: string;
    browser?: string;
}

//#endregion

//#region Search

export interface ArticleSearchPageRequest extends PaginationRequest {
    keyWord?: string;
}

export interface ArticleSearchPaginationResult extends PaginationResult<ArticleSearchPageModel> {
    keyWordSegs?: Array<string>;
}

export interface ArticleSearchPageModel {
    articleId: string; // 文章Id
    category: string; // 分类
    title: string;
    description: string;
    tags: string;
    content: string;
    createTime: Date;
}

//#endregion

//#region Store

export interface SearchRecordModel {
    word: string;
    date: Date;
}

//#endregion
