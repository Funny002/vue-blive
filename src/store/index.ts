import Vue from 'vue'
import Vuex from 'vuex'

/* 其他模块 */
import SidebarMenu from "./SidebarMenu/index";

/* 引入自定义接口 */
import {IndexState} from './interface'

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        isBeta: true,
        version: '0.1.8',
        author: "Re Funny",
        email: "2053423015@qq.com",
    } as IndexState),
    getters: {
        getVersion: ({version, isBeta}: IndexState): string => (`Version: ${version}${isBeta ? ' Beta' : ''}`),
        getCopyright: ({author}: IndexState): string => (`Copyright © ${new Date().getFullYear()} ${author} . All Rights Reserved`)
    },
    modules: {
        SidebarMenu, // 工作台菜单
    }
});
