import Request from './request';

//#region 文章管理

import {
    ArticlePageModel,
    ArticlePageRequest,
    CategoryWithArticleCountModel,
    PaginationResult,
} from '@src/common/model';

export const articlePage = (request: ArticlePageRequest) => {
    return Request.get<PaginationResult<ArticlePageModel>>('article/page', { params: request });
};

//#endregion

//#region 文章分类

export const articleCategoryList = (name?: string) => {
    return Request.get<Array<CategoryWithArticleCountModel>>('category/list', {
        params: { name: name },
    });
};

//#endregion
