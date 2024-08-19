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
                home: {},
                article: {},
                lab: {},
                moment: {},
                about: {},
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
                let colorConfig = get().color;
                console.log(colorConfig);
                const setColorVariables = (level: string, colors: string[], indexs: number[]) => {
                    variables.forEach((v, i) => {
                        let index = indexs[i];
                        if (index < 0) return;
                        let suffix = v == 'default' ? '' : `-${v}`;
                        let color = colors[index];
                        color = color?.startsWith('#') ? color : `rgba(var(--semi-${color}), 1)`;
                        body.style.setProperty(`--semi-color-${level}${suffix}`, color);
                    });
                };
                setColorVariables('primary', colorConfig.primary, primaryColorIndexs);
                setColorVariables('secondary', colorConfig.secondary, secondaryColorIndexs);
                setColorVariables('tertiary', colorConfig.tertiary, tertiaryColorIndexs);
            },
        }),
        {
            name: 'config-store',
        }
    )
);

export default useUserStore;
