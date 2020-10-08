import Vue from 'vue'
import Vuex from 'vuex'

/* 引入自定义接口 */
import {IndexState} from './interface'

/* 其他组件 */
import User from './user/index' // 用户
import Expand from './expand/index' // 扩展
import Breadcrumb from './breadcrumb/index'
import WorkbenchDialog from './workbenchDialog/index'

/* 挂载全局 */
Vue.use(Vuex)

/* 创建实例 */
export default new Vuex.Store({
    state: () => ({
        isBeta: true,
        version: '0.1.8',
        author: "Re Funny",
        email: "2048412928@qq.com",
    } as IndexState),
    getters: {
        getVersion: ({version, isBeta}: IndexState): string => {
            return `Version: ${version}${isBeta ? ' Beta' : ''}`;
        },
        getCopyright: ({author}: IndexState): string => {
            return `Copyright © ${new Date().getFullYear()} ${author} . All Rights Reserved`
        }
    },
    modules: {
        User,
        Expand,
        Breadcrumb,
        WorkbenchDialog
    }
});
