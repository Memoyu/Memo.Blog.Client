import React, { FC, useState } from 'react';

import { RadioGroup, Toast } from '@douyinfe/semi-ui';
import { OptionItem } from '@douyinfe/semi-ui/lib/es/radio';

import { useOnMountUnsafe } from '@src/hooks/useOnMountUnsafe';

import { articleCategoryList } from '@src/utils/request';

import './index.scss';

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const [value, setValue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryOpts, setCategoryOpts] = useState<Array<OptionItem>>([]);

    // 获取文章分类
    let getArticleCategoryList = () => {
        articleCategoryList()
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                let opts: Array<OptionItem> = res.data.map((c) => {
                    return {
                        label: `${c.name} [${c.articles}]`,
                        value: c.categoryId,
                    } as OptionItem;
                });
                setCategoryOpts(opts);
            })
            .finally(() => setLoading(false));
    };

    useOnMountUnsafe(() => {
        getArticleCategoryList();
    });

    return (
        <div className="article-category-list">
            <div className="article-category-list-wrap">
                <RadioGroup
                    type="button"
                    buttonSize="large"
                    defaultValue={value}
                    style={{ background: 'transparent', whiteSpace: 'nowrap' }}
                    options={categoryOpts}
                />
            </div>
        </div>
    );
};

export default Index;
