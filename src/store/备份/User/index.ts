import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import {StoreOptions} from "vuex";

export default {
    namespaced: true,
    state: () => ({
        //
    }),
    getters,
    actions,
    mutations,
} as StoreOptions<any>;
