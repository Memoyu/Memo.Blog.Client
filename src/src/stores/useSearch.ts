import { createWithEqualityFn } from 'zustand/traditional';
import { persist } from 'zustand/middleware';
import { SearchRecordModel } from '@src/common/model';

interface SearchState {
    show: boolean;
    records: Array<string>;
    setShow: (isShow: boolean) => void;
}

const useSearchStore = createWithEqualityFn<SearchState>()(
    persist(
        (set) => ({
            show: false,
            records: ['3333', '6666'],
            setShow: (isShow: boolean) => {
                set({
                    show: isShow,
                    records: ['3333', '6666', 'rrrrr', 'rrrrr', 'rrrrr', 'rrrrr', 'rrrrr'],
                });
            },
        }),
        {
            name: 'search-store',
        }
    )
);

export default useSearchStore;
