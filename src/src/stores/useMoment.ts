import { createWithEqualityFn } from 'zustand/traditional';
import { subscribeWithSelector } from 'zustand/middleware';
import { MomentModel, MomentPageRequest } from '@src/common/model';
import { momentPage } from '@src/utils/request';

interface MomentState {
    moments: Array<MomentModel>;
    getMoments: (request: MomentPageRequest, init: boolean) => Promise<number | undefined>; // 获取动态
    setMomentLike: (momentId: string) => void;
    incrementComments: (momentId: string, num: number) => void; // 增加评论数量
}

const useMoment = createWithEqualityFn<MomentState>()(
    subscribeWithSelector((set, get) => ({
        moments: [],
        getMoments: async (request: MomentPageRequest, init: boolean) => {
            let res = await momentPage(request);
            let resMoments = res.data?.items ? res.data.items : [];
            if (!init) {
                let moments = get().moments;
                resMoments.forEach((m) => {
                    if (moments.findIndex((s) => s.momentId == m.momentId) < 0) {
                        moments.push(m);
                    }
                });

                resMoments = moments;
            }

            set({ moments: resMoments });
            return res.data?.total;
        },
        setMomentLike: (momentId: string) => {
            let moments = get().moments;
            moments.forEach((m) => {
                if (momentId == m.momentId) {
                    m.isLike = true;
                }
            });

            set({ moments: moments });
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
