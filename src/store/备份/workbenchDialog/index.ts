import {workbenchDialogState} from '../interface'
import {StoreOptions} from "vuex";

export default {
    namespaced: true,
    state: () => ({
        path: "",
        title: "",
        list: [
            {path: 'gallery', title: '图床'},
            {path: 'history', title: '缓存'},
            {path: 'pagination', title: '分页'},
            {path: 'release', title: '发布'},
            {path: 'site', title: '设置'},
            {path: 'template', title: '模板'},
        ]
    } as workbenchDialogState),
    getters: {
        getDialog: ({title, path}: workbenchDialogState) => {
            return {title, path}
        }
    },
    mutations: {
        setPath: (state: workbenchDialogState, value: string) => {
            for (const {path, title} of state.list) {
                if (path === value) {
                    state.path = path
                    state.title = title
                    setTimeout(() => {
                        state.path = ''
                        state.title = ''
                    }, 100)
                }
            }
        }
    },
} as StoreOptions<any>;
