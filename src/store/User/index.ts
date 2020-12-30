import {StoreOptions} from "vuex";
import {StoreUserInfo} from './verifyUserInfo'

export default {
    namespaced: true,
    state: function () {
        return {
            info: undefined,
        } as StoreUserInfo
    },
    getters: {
        getInfo: ({info}: StoreUserInfo) => info,
    }
} as StoreOptions<any>
// user:{
//     info:{
//
//     },
//
// }