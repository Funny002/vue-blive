import {expandStatus, rulerMobile} from "@/store/interface";
import {StoreOptions} from 'vuex'

export default {
    namespaced: true,
    state: () => {
        // 获取全部工作台配置
        const expand = JSON.parse(localStorage.getItem('expand_config') || '{}')
        return Object.assign({
            saveView: 0,
            saveClock: 10,
            saveNumber: 0,
            saveStatus: 0,
            //
            rulerStatus: false,
            rulerMobile: {left: 0, top: 0}
        }, expand) as expandStatus
    },
    getters: {
        /* 标尺 */
        getRuler: ({rulerStatus}: expandStatus) => rulerStatus,
        getRulerMobile: ({rulerMobile}: expandStatus) => rulerMobile,
        /* 自动保存 */
        getSave: ({saveStatus}: expandStatus) => saveStatus,
        getSaveView: ({saveView}: expandStatus) => saveView, // 缓存更新通知
        getSaveClock: ({saveClock}: expandStatus) => saveClock,
    },
    actions: {
        save: ({state, commit}, {type, value}: { type: string; value: any }) => {
            commit(type, value)
            // 保存
            localStorage.setItem('expand_config', JSON.stringify(state))
        }
    },
    mutations: {
        saveUpdate: (state: expandStatus) => (state.saveView++),
        saveNumber: (state: expandStatus) => (state.saveNumber++),
        setRuler: (state: expandStatus, status: boolean) => {
            state.rulerStatus = status
        },
        setRulerMobile: (state: expandStatus, status: rulerMobile) => {
            state.rulerMobile = status
        },
        //
        setSave: (state: expandStatus, status: boolean) => {
            if (status) {
                state.saveStatus = setInterval(() => {
                    state.saveNumber++
                }, state.saveClock * 360000)
            } else {
                clearInterval(state.saveStatus) // 关闭
                // 清空
                state.saveStatus = 0
                state.saveNumber = 0
            }
        },
        setSaveClock: (state: expandStatus, clock: number) => {
            state.saveClock = clock > 10 ? clock : 10
        }
    }
} as StoreOptions<any>
