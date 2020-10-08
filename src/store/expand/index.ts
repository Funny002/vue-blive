import {expandStatus, rulerMobile} from "@/store/interface";
import {StoreOptions} from 'vuex'

export default {
    namespaced: true,
    state: () => {
        // 获取全部工作台配置
        const expand = JSON.parse(localStorage.getItem('expand_config') || '{}')
        return Object.assign({
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
        getSaveClock: ({saveClock}: expandStatus) => saveClock,
    },
    actions: {
        save: (actions: any, {type, value}: any) => {
            actions.commit(type, value)
            // 保存
            localStorage.setItem('expand_config', JSON.stringify(actions.state))
        }
    },
    mutations: {
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
