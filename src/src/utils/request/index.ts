import Request from './request';

//#region 文章管理

import { ArticlePageModel, ArticlePageRequest, PaginationResult } from '@src/common/model';

export const articlePage = (request: ArticlePageRequest) => {
    return Request.get<PaginationResult<ArticlePageModel>>('article/page', { params: request });
};

//#endregion
