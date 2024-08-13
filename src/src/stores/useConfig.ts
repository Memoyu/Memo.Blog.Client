import { createWithEqualityFn } from 'zustand/traditional';
import { persist } from 'zustand/middleware';
import { BannerConfigModel, StyleConfigModel } from '@src/common/model';
import { configGet } from '@src/utils/request';

interface ConfigState {
    banner: BannerConfigModel;
    style: StyleConfigModel;
    init: () => Promise<void>;
}

const body = document.body;

const useUserStore = createWithEqualityFn<ConfigState>()(
    persist(
        (set, get) => ({
            banner: {
                home: 'http://oss.blog.memoyu.com/articles/banner/-9999077311f.png',
                article:
                    '	http://oss.blog.memoyu.com/articles/banner/502a2248-2ee7-48eb-af67-c5b0b9a9a5f1.png',
                lab: 'http://oss.blog.memoyu.com/page/about/banner/fc873d0f-b4bf-414b-8458-930de1d12d5d.png',
                moment: 'http://oss.blog.memoyu.com/articles/bdbb6831-bccb-4139-96c7-b85395038d5e.png',
                about: 'http://oss.blog.memoyu.com/page/about/banner/-9999efc36e5.jpg',
            },
            style: {
                primaryColor: 'rgba(var(--semi-violet-6), 1)',
                primaryHover: 'rgba(var(--semi-violet-5), 1)',
                primaryActive: 'rgba(var(--semi-violet-7), 1)',
                primaryDisabled: 'rgba(var(--semi-violet-1), 1)',
                primaryLightDefault: 'rgba(var(--semi-violet-1), 1)',
                primaryLightHover: 'rgba(var(--semi-violet-2), 1)',
                primaryLightActive: 'rgba(var(--semi-violet-3), 1)',

                secondaryColor: 'rgba(var(--semi-purple-6), 1)',
                secondaryHover: 'rgba(var(--semi-purple-5), 1)',
                secondaryActive: 'rgba(var(--semi-purple-7), 1)',
                secondaryDisabled: 'rgba(var(--semi-purple-1), 1)',
                secondaryLightDefault: 'rgba(var(--semi-purple-0), 1)',
                secondaryLightHover: 'rgba(var(--semi-purple-1), 1)',
                secondaryLightActive: 'rgba(var(--semi-purple-2), 1)',

                tertiaryColor: 'rgba(var(--semi-neutral-8), 1)',
                tertiaryHover: 'rgba(var(--semi-neutral-7), 1)',
                tertiaryActive: 'rgba(var(--semi-neutral-9), 1)',
                tertiaryLightDefault: 'rgba(var(--semi-grey-0), 1)',
                tertiaryLightHover: 'rgba(var(--semi-grey-1), 1)',
                tertiaryLightActive: 'rgba(var(--semi-grey-2), 1)',
            },
            init: async () => {
                try {
                    let res = await configGet();
                    if (res.isSuccess && res.data != undefined) {
                        let config = res.data;
                        set({ banner: config.banner, style: config.style });
                    }
                } catch {}

                // 配置属性
                let style = get().style;
                body.style.setProperty(`--semi-color-primary`, style.primaryColor);
                body.style.setProperty(`--semi-color-primary-hover`, style.primaryHover);
                body.style.setProperty(`--semi-color-primary-active`, style.primaryActive);
                body.style.setProperty(`--semi-color-primary-disabled`, style.primaryDisabled);
                body.style.setProperty(
                    `--semi-color-primary-light-default`,
                    style.primaryLightDefault
                );
                body.style.setProperty(`--semi-color-primary-light-hover`, style.primaryLightHover);
                body.style.setProperty(
                    `--semi-color-primary-light-active`,
                    style.primaryLightActive
                );

                body.style.setProperty(`--semi-color-secondary`, style.secondaryColor);
                body.style.setProperty(`--semi-color-secondary-hover`, style.secondaryHover);
                body.style.setProperty(`--semi-color-secondary-active`, style.secondaryActive);
                body.style.setProperty(`--semi-color-secondary-disabled`, style.secondaryDisabled);
                body.style.setProperty(
                    `--semi-color-secondary-light-default`,
                    style.secondaryLightDefault
                );
                body.style.setProperty(
                    `--semi-color-secondary-light-hover`,
                    style.secondaryLightHover
                );
                body.style.setProperty(
                    `--semi-color-secondary-light-active`,
                    style.secondaryLightActive
                );

                body.style.setProperty(`--semi-color-tertiary`, style.tertiaryColor);
                body.style.setProperty(`--semi-color-tertiary-hover`, style.tertiaryHover);
                body.style.setProperty(`--semi-color-tertiary-active`, style.tertiaryActive);
                body.style.setProperty(
                    `--semi-color-tertiary-light-default`,
                    style.tertiaryLightDefault
                );
                body.style.setProperty(
                    `--semi-color-tertiary-light-hover`,
                    style.tertiaryLightHover
                );
                body.style.setProperty(
                    `--semi-color-tertiary-light-active`,
                    style.tertiaryLightActive
                );
            },
        }),
        {
            name: 'config-store',
        }
    )
);

export default useUserStore;
