import { createWithEqualityFn } from 'zustand/traditional';
import { subscribeWithSelector, persist } from 'zustand/middleware';
import { AvatarOriginType, SetVisitorStateModel } from '@src/common/model';
import { visitorCreate, visitorUpdate } from '@src/utils/request';

interface VisitorState {
    visitorId?: string;
    nickname?: string;
    email?: string;
    avatar?: string;
    avatarOriginType?: AvatarOriginType;
    avatarOrigin?: string;
    initVisitor: () => Promise<string | undefined>;
    setVisitor: (info: SetVisitorStateModel) => void;
}

// 标识当前访客是否在创建中
let createing = false;
//重试队列
let promiseCallbacks: Array<(id?: string) => void> = [];

const useVisitor = createWithEqualityFn<VisitorState>()(
    subscribeWithSelector(
        persist(
            (set, get) => ({
                initVisitor: async () => {
                    // console.log('创建标识', createing);
                    // 已经存在访客了，就不用创建了
                    if (get().visitorId) return;
                    // 没有在创建访客，则进行创建
                    if (!createing) {
                        createing = true;
                        return new Promise((resolve, reject) => {
                            visitorCreate({})
                                .then((res) => {
                                    if (!res.isSuccess || !res.data) {
                                        console.log('创建访客失败', res);
                                        reject(res);
                                    } else {
                                        set({ visitorId: res.data });
                                        resolve(res.data);
                                    }
                                    // 无论成功与否，都执行一下回调
                                    promiseCallbacks.forEach((pcb) => pcb(res.data));
                                })
                                .finally(() => {
                                    createing = false;
                                });
                        });
                    } else {
                        // 已经在创建了，那就等一下
                        return new Promise((resolve, reject) => {
                            promiseCallbacks.push((id?: string) => {
                                id ? resolve(id) : reject(id);
                            });
                        });
                    }
                },
                setVisitor: (info: SetVisitorStateModel) => {
                    // 设置状态
                    set({
                        nickname: info.nickname,
                        email: info.email,
                        avatar: info.avatar,
                        avatarOriginType: info.avatarOriginType,
                        avatarOrigin: info.avatarOrigin,
                    });
                    visitorUpdate({ ...info }).then((res) => {
                        if (!res.isSuccess || !res.data) return;

                        // 避免出现保存时，访客还并未创建，此时创建了，再给赋上id
                        // 存在的，同样也可以覆盖，毕竟值不变
                        set({ visitorId: res.data });
                    });
                },
            }),
            {
                name: 'visitor-store', // name of the item in the storage (must be unique)
            }
        )
    )
);

export default useVisitor;
