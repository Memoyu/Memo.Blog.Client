import { createWithEqualityFn } from 'zustand/traditional';
import { subscribeWithSelector } from 'zustand/middleware';

interface ArticleCommentState {
    commentTotal: number;
    setCommentTotal: (total: number) => void; // 设置评论数
    incrementCommentTotal: (num: number) => void; // 增加评论数
}

const useArticleComment = createWithEqualityFn<ArticleCommentState>()(
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

export default useArticleComment;
