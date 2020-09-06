import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isBeta: true, // 是否 Beta 版
        version: '0.0.1', // 版本
        author: "Re Funny", // 作者
        email: "2048412928@qq.com", // 邮箱
        lang: localStorage.getItem('Lang') || this.$i18n.locale, // i18n
    },
    getters: {
        getLang: state => {
            return state.lang
        },
        getVersion: ({version, isBeta}) => {
            return `Version: ${version}${isBeta ? ' Beta' : ''}`
        },
        getCopyright: ({author}) => {
            return `Copyright © ${new Date().getFullYear()} ${author} . All Rights Reserved`
        }
    },
    mutations: {
        setLang(state, lang) {
            state.lang = lang
            localStorage.setItem('Lang', lang)
        }
    },
    actions: {},
    modules: {}
})
