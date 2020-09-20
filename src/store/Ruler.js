export default {
    namespaced: true,
    state: () => ({
        mobile: {top: 0, left: 0},
        show: localStorage.getItem('Ruler') && localStorage.getItem('Ruler') !== 'false',
    }),
    getters: {
        // 获取标尺是否显示
        getShow: state => state.show,
        getMobile: state => state.mobile,
    },
    mutations: {
        // 设置是否显示
        setShow: (state, value) => {
            state.show = value
            localStorage.setItem('Ruler', value)
        },
        setMobile: (state, value) => {
            state.mobile = value
            // localStorage.setItem('Ruler', value)
        },
    }
}
