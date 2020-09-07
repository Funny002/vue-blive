import Vue from 'vue'
import VueI18n from 'vue-i18n'
// 引入 element 的 i18n 包
import enLang from 'element-ui/src/locale/lang/en'
import zhLang from 'element-ui/src/locale/lang/zh-CN'

Vue.use(VueI18n)

// 装载
const messages = {
    zh: Object.assign(zhLang),
    en: Object.assign(enLang)
}


const lang = localStorage.getItem('Lang')
if (!lang) {
    localStorage.setItem('Lang', 'zh')
}

export const i18n = new VueI18n({
    locale: lang || 'zh', // 默认语言
    // formatFallbackMessages: true,
    silentTranslationWarn: true, // i18n单文件必须
    fallbackLocale: 'en', // 回退
    messages,
})
