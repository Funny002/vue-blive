export default {
    namespaced: true,
    state: () => ({
        html: null, // 全部的元素
        click: null, // 被点击的元素
        mouseenter: null, // 移入的元素
    }),
    getters: {
        getHtml: state => state.html,
        getClick: state => state.click,
        getMouseenter: state => state.mouseenter,
    },
    mutations: {
        setHtml: (state, value) => state.html = value,
        setClick: (state, value) => state.click = value,
        setMouseenter: (state, value) => state.mouseenter = value,
    }
}
