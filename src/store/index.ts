import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

/* 其他组件 */
import User from './user/index' // 用户
import Ruler from './ruler/index' // 标尺
import History from './history/index' // 缓存

/* 挂载全局 */
Vue.use(Vuex)

/* 创建实例 */
export default new Vuex.Store({
    state: () => ({
        //
    }),
    actions,
    getters,
    mutations,
    modules: {
        User,
        Ruler,
        History,
    }
});
