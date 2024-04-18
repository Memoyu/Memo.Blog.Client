import React, { FC, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RadioGroup, Toast } from '@douyinfe/semi-ui';
import { OptionItem, RadioChangeEvent } from '@douyinfe/semi-ui/lib/es/radio';

import { useOnMountUnsafe } from '@src/hooks/useOnMountUnsafe';

import { articleCategoryList } from '@src/utils/request';

import './index.scss';

interface ComProps {}

const Index: FC<ComProps> = ({}) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const [value, setValue] = useState<string>('0');
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
                        value: c.categoryId.toString(),
                    } as OptionItem;
                });
                setCategoryOpts(opts);
            })
            .finally(() => setLoading(false));
    };

    useOnMountUnsafe(() => {
        var categoryId = params.getAll('category')[0];
        setValue(categoryId);
        getArticleCategoryList();
    });

    // 触发分类选中
    let handlerCategoryChange = (categoryId: number) => {
        navigate('/home?category=' + categoryId);
    };

    return (
        // 在没有数据的情况下不占用空间
        categoryOpts.length > 0 && (
            <div className="article-category-list">
                <div className="article-category-list-wrap">
                    <RadioGroup
                        type="button"
                        buttonSize="large"
                        defaultValue={value}
                        style={{ background: 'transparent', whiteSpace: 'nowrap' }}
                        options={categoryOpts}
                        onChange={(e) => handlerCategoryChange(e.target.value)}
                    />
                </div>
            </div>
        )
    );
};

export default Index;
