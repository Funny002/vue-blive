import Vue from "vue";
// 引入样式
import "./theme/default.scss";
// 引入UI组件
import * as ElementUI from "element-ui";
// 引入语言包
import locale from "element-ui/lib/locale";
import lang from "element-ui/lib/locale/lang/zh-CN";
// 为组件挂载语言
locale.use(lang);
// 挂载全局样式
Vue.prototype.$ELEMENT = {size: "small", zIndex: 10000};

const back = ["i18n", "index"]; // 剔除
// const use = ["Button", "Input", "Dialog"]; // 需要挂载

// 自动挂载组件
for (const keys in ElementUI) {
    // 跳过剔除
    // if (!back.includes(keys) && use.includes(keys)) {
    if (!back.includes(keys)) {
        // 特殊挂载
        if (keys === "MessageBox") {
            Vue.prototype.$msgbox = ElementUI[keys];
            // 挂载子级
            for (const key in ElementUI[keys]) {
                Vue.prototype["$" + key] = ElementUI[keys][key];
            }
        } else if (keys === "Loading") {
            Vue.prototype.$loading = ElementUI[keys].service;
        } else if (keys === "Message") {
            Vue.prototype.$message = ElementUI[keys];
        } else if (keys === "Notification") {
            Vue.prototype.$notify = ElementUI[keys];
        } else {
            Vue.use(ElementUI[keys]);
        }
    }
}
