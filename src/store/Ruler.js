export default {
    namespaced: true,
    state: () => ({
        show: localStorage.getItem('Ruler') && localStorage.getItem('Ruler') !== 'false'
    }),
    getters: {
        // 获取标尺是否显示
        getShow: state => state.show,
    },
    mutations: {
        // 设置是否显示
        setShow: (state, value) => {
            state.show = value
            localStorage.setItem('Ruler', value)
        }
    }
}
