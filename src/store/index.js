import Vue from 'vue';
import Vuex from 'vuex';
import Ruler from "./Ruler.js";
import Blive from './Blive.js';
import History from './History.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        isBeta: true, // 是否 Beta 版
        version: '0.1.8', // 版本
        author: "Re Funny", // 作者
        email: "2048412928@qq.com", // 邮箱
        lang: localStorage.getItem('Lang') || 'zh', // i18n
    }),
    getters: {
        getLang: state => state.lang,
        getVersion: ({version, isBeta}) => `Version: ${version}${isBeta ? ' Beta' : ''}`,
        getCopyright: ({author}) => `Copyright © ${new Date().getFullYear()} ${author} . All Rights Reserved`,
    },
    mutations: {
        setLang(state, lang) {
            state.lang = lang
            localStorage.setItem('Lang', lang)
        }
    },
    actions: {},
    modules: {
        History: History, // 缓存
        Ruler: Ruler, // 标尺
        Blive: Blive, // 主体
    }
})
