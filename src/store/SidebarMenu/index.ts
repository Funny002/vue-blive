import {StoreOptions} from "vuex";

import {SidebarMenuState} from './interface'

/** 开通一个窗口打开接口
 * 通过其他方法调用接收到通知并且改窗口名存在
 */
export default {
    namespaced: true,
    state: () => ({
        open: {
            name: undefined,
            item: undefined,
        }
    } as SidebarMenuState),
    getters: {
        getOpenName: ({open}: SidebarMenuState) => (open.name),
    },
    mutations: {
        setOpenName: (state, value: string) => {
            // 请求打开窗口 ~ 1ms 回收
            state.open = {name: value, item: new Date().getTime()}
            setTimeout(() => (state.open = {name: undefined, item: undefined}), 100)
            // #
            // 请求打开窗口 ~ 接收到重复，窗口名称 ~ 回收在赋值？
            // const DeleteOpen = () => (state.open = {name: undefined, item: undefined})
            // if (state.open.name === value) DeleteOpen()
            // state.open = {name: value, item: new Date().getTime()}
        }
    },
} as StoreOptions<any>;
