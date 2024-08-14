import { createWithEqualityFn } from 'zustand/traditional';
import { persist } from 'zustand/middleware';
import { BannerConfigModel, ColorConfigModel } from '@src/common/model';
import { configGet } from '@src/utils/request';

const variables = [
    'default',
    'hover',
    'active',
    'disabled',
    'light-default',
    'light-hover',
    'light-active',
];

const primaryColorIndexs = [5, 6, 7, 2, 0, 1, 2];
const secondaryColorIndexs = [5, 6, 7, 2, 0, 1, 2];
const tertiaryColorIndexs = [5, 6, 7, -1, 0, 1, 2];

interface ConfigState {
    banner: BannerConfigModel;
    color: ColorConfigModel;
    init: () => Promise<void>;
}

const body = document.body;

const useUserStore = createWithEqualityFn<ConfigState>()(
    persist(
        (set, get) => ({
            banner: {
                home: 'http://oss.blog.memoyu.com/articles/banner/-9999077311f.png',
                article:
                    'http://oss.blog.memoyu.com/articles/banner/502a2248-2ee7-48eb-af67-c5b0b9a9a5f1.png',
                lab: 'http://oss.blog.memoyu.com/page/about/banner/fc873d0f-b4bf-414b-8458-930de1d12d5d.png',
                moment: 'http://oss.blog.memoyu.com/articles/bdbb6831-bccb-4139-96c7-b85395038d5e.png',
                about: 'http://oss.blog.memoyu.com/page/about/banner/-9999efc36e5.jpg',
            },
            color: {
                //生成默认颜色
                primary: Array.from({ length: 10 }, (_, i) => `rgba(var(--semi-violet-${i}), 1)`),
                secondary: Array.from({ length: 10 }, (_, i) => `rgba(var(--semi-purple-${i}), 1)`),
                tertiary: Array.from({ length: 10 }, (_, i) => `rgba(var(--semi-neutral-${i}), 1)`),
            },
            init: async () => {
                try {
                    let res = await configGet();
                    if (res.isSuccess && res.data != undefined) {
                        let config = res.data;
                        set({ banner: config.banner, color: config.color });
                    }
                } catch {}

                // 配置属性
                let style = get().color;

                const setColorVariables = (level: string, colors: string[], indexs: number[]) => {
                    variables.forEach((v, i) => {
                        let index = indexs[i];
                        if (index < 0) return;
                        let suffix = v == 'default' ? '' : `-${v}`;
                        body.style.setProperty(`--semi-color-${level}${suffix}`, colors[index]);
                    });
                };
                setColorVariables('primary', style.primary, primaryColorIndexs);
                setColorVariables('secondary', style.secondary, secondaryColorIndexs);
                setColorVariables('tertiary', style.tertiary, tertiaryColorIndexs);
            },
        }),
        {
            name: 'config-store',
        }
    )
);

export default useUserStore;
