import { createWithEqualityFn } from 'zustand/traditional';
import { persist } from 'zustand/middleware';

interface SearchModalState {
    show: boolean;
    setShow: (isShow: boolean) => void;
}

interface SearchState {
    records: Array<string>;
    addRecord: (keyWord: string) => void;
    removeRecord: (keyWord: string) => void;
    clearRecord: () => void;
}

const useSearchModalStore = createWithEqualityFn<SearchModalState>()((set) => ({
    show: false,
    setShow: (isShow: boolean) => {
        set({ show: isShow });
    },
}));

const useSearchStore = createWithEqualityFn<SearchState>()(
    persist(
        (set, get) => ({
            records: [],
            addRecord: (keyWord: string) => {
                let records = get().records;

                // 是否已存在相同记录
                let index = records.indexOf(keyWord);
                if (index > -1) return;

                // 记录数大于20则进行早期记录移除
                if (records.length >= 20) {
                    let c = records.length - 20;
                    records.splice(-1, c + 1);
                }

                records.unshift(keyWord);
                set({ records });
            },
            removeRecord: (keyWord: string) => {
                let records = get().records;
                let index = records.indexOf(keyWord);
                if (index > -1) {
                    records.splice(index, 1);
                }
                set({ records });
            },
            clearRecord: () => {
                set({ records: [] });
            },
        }),
        {
            name: 'search-store',
        }
    )
);

export { useSearchStore, useSearchModalStore };
