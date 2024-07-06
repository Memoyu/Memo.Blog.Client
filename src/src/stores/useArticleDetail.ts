import { createWithEqualityFn } from 'zustand/traditional';
import { subscribeWithSelector } from 'zustand/middleware';

interface ArticleDetailState {
    commentTotal: number;
    setCommentTotal: (total: number) => void; // 设置评论数
    incrementCommentTotal: (num: number) => void; // 增加评论数
}

const useArticleDetail = createWithEqualityFn<ArticleDetailState>()(
    subscribeWithSelector((set, get) => ({
        commentTotal: 0,
        setCommentTotal: (total: number) => {
            set({ commentTotal: total });
        },
        incrementCommentTotal: (num: number) => {
            set({ commentTotal: num + get().commentTotal });
        },
    }))
);

export default useArticleDetail;
