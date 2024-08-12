import { createWithEqualityFn } from 'zustand/traditional';
import { persist } from 'zustand/middleware';
import { StyleConfigModel } from '@src/common/model';
import { configGet } from '@src/utils/request';

interface ConfigState {
    style: StyleConfigModel;
    init: () => Promise<void>;
}

const body = document.body;

const useUserStore = createWithEqualityFn<ConfigState>()(
    persist(
        (set, get) => ({
            style: {
                primaryColor: 'rgba(var(--semi-violet-3), 1)',
                secondaryColor: 'rgba(var(--semi-violet-2), 1)',
                tertiaryColor: 'rgba(var(--semi-violet-0), 1)',
            },
            init: async () => {
                try {
                    let res = await configGet();
                    if (res.isSuccess && res.data != undefined) {
                        let config = res.data;
                        set({ style: config.style });
                    }
                } catch {}

                let style = get().style;
                body.style.setProperty(`--semi-color-primary`, style.primaryColor);
                body.style.setProperty(`--semi-color-secondary`, style.secondaryColor);
                body.style.setProperty(`--semi-color-tertiary`, style.tertiaryColor);
            },
        }),
        {
            name: 'config-store',
        }
    )
);

export default useUserStore;
