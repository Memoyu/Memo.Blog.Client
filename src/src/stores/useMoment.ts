import { createWithEqualityFn } from 'zustand/traditional';
import { subscribeWithSelector } from 'zustand/middleware';
import { MomentModel, MomentPageRequest } from '@src/common/model';
import { momentPage } from '@src/utils/request';

interface MomentState {
    moments: Array<MomentModel>;
    getMoments: (request: MomentPageRequest, init: boolean) => Promise<number | undefined>; // 获取动态
    incrementComments: (momentId: string, num: number) => void; // 增加评论数量
}

const useMoment = createWithEqualityFn<MomentState>()(
    subscribeWithSelector((set, get) => ({
        moments: [],
        getMoments: async (request: MomentPageRequest, init: boolean) => {
            let res = await momentPage(request);
            let resMoments = res.data?.items ? res.data.items : [];
            if (!init) {
                let momets = get().moments;
                resMoments.forEach((m) => {
                    if (momets.findIndex((s) => s.momentId == m.momentId) < 0) {
                        momets.push(m);
                    }
                });

                resMoments = momets;
            }

            set({ moments: resMoments });
            return res.data?.total;
        },
        incrementComments: (momentId: string, num: number) => {
            let momets = get().moments;
            momets.forEach((m) => {
                if (m.momentId == momentId) {
                    m.comments += num;
                }
            });
            set({ moments: momets });
        },
    }))
);

export default useMoment;
