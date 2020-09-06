import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        version: '0.0.1', // 版本
        lang: localStorage.getItem('Lang') || this.$i18n.locale, // i18n
    },
    getters: {
        getLang: state => {
            return state.lang
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
