import { FC, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { RadioGroup, Toast } from '@douyinfe/semi-ui';
import { OptionItem } from '@douyinfe/semi-ui/lib/es/radio';

import { useOnMountUnsafe } from '@src/hooks/useOnMountUnsafe';

import { articleCategoryList } from '@src/utils/request';

import './index.scss';

interface ComProps {}

const initCategory: OptionItem = { value: '0' };

const Index: FC<ComProps> = ({}) => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const [value, setValue] = useState<string>('0');
    const [_loading, setLoading] = useState<boolean>(false);
    const [categoryOpts, setCategoryOpts] = useState<Array<OptionItem>>([]);

    // 获取文章分类
    let getArticleCategoryList = () => {
        articleCategoryList()
            .then((res) => {
                if (!res.isSuccess || !res.data) {
                    Toast.error(res.message);
                    return;
                }

                let total = 0;
                let opts: Array<OptionItem> = res.data.map((c) => {
                    total += c.articles;
                    return {
                        label: `${c.name} [${c.articles}]`,
                        value: c.categoryId.toString(),
                    } as OptionItem;
                });
                initCategory.label = `全部 [${total}]`;
                opts.unshift(initCategory);
                setCategoryOpts(opts);
            })
            .finally(() => setLoading(false));
    };

    useOnMountUnsafe(() => {
        var categoryId = params.getAll('category')[0] ?? initCategory.value;
        setValue(categoryId);
        getArticleCategoryList();
    });
    let handleCategoryChange = (id: string) => {
        navigate(id == initCategory.value ? '/article' : `/article?category=${id}`);
        //  onChange && onChange(id);
    };
    return (
        // 在没有数据的情况下不占用空间
        categoryOpts.length > 0 && (
            <div className="article-category-list">
                <RadioGroup
                    type="button"
                    buttonSize="large"
                    defaultValue={value}
                    style={{ background: 'transparent', whiteSpace: 'nowrap' }}
                    options={categoryOpts}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                />
            </div>
        )
    );
};

export default Index;
