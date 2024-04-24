import axios from 'axios';
import Request from './request';

import {
    ArticlePageModel,
    ArticleModel,
    ArticlePageRequest,
    CategoryWithArticleCountModel,
    OpenSourceProjectModel,
    PaginationResult,
    AboutModel,
    MomentPageRequest,
    MomentModel,
    CommentModel,
    CommentPageRequest,
    CommentEditRequest,
} from '@common/model';

export const getByUrl = (url: string, params?: any) => {
    let instance = axios.create({ withCredentials: false });
    return instance.get(url, { params });
};

//#region 文章管理

export const articlePage = (request: ArticlePageRequest) => {
    return Request.get<PaginationResult<ArticlePageModel>>('article/page', { params: request });
};

export const articleGet = (id: string) => {
    return Request.get<ArticleModel>('article/get', { params: { articleId: id } });
};

//#endregion

//#region 文章分类

export const articleCategoryList = (name?: string) => {
    return Request.get<Array<CategoryWithArticleCountModel>>('category/list', {
        params: { name: name },
    });
};

//#endregion

//#region 开源项目

export const openSourceProjectList = () => {
    return Request.get<Array<OpenSourceProjectModel>>('opensource/list');
};

//#endregion

//#region 动态

export const momentPage = (request: MomentPageRequest) => {
    return Request.get<PaginationResult<MomentModel>>('moment/page', { params: request });
};

//#endregion

//#region 关于

export const aboutGet = () => {
    return Request.get<AboutModel>('about/get');
};

//#endregion

//#region 评论

export const commentCreate = (comment: CommentEditRequest) => {
    return Request.post<CommentModel>('comment/create', comment);
};

export const commentPage = (request: CommentPageRequest) => {
    return Request.get<PaginationResult<CommentModel>>('comment/page', { params: request });
};

//#endregion
