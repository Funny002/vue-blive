const getHistory = () => {
    let History = localStorage.getItem('History');
    if (History) {
        History = JSON.parse(History)
    } else {
        History = {
            clock: 10,
            authSave: false,
        }
    }
    History.view = 0
    History.ini = 0
    return History
}

export default {
    namespaced: true,
    state: (() => getHistory()),
    getters: {
        getIni: state => state.ini,
        getView: state => state.view,
        getClock: state => state.clock,
        getAuthSave: state => !!state.authSave
    },
    mutations: {
        setView: (state) => state.view++,
        setAuthSave: (state, value) => {
            if (value) {
                state.authSave = setInterval(() => {
                    state.ini++; // 更新状态
                    // }, 3600000 * state.clock)
                }, 36 * state.clock)
            } else {
                clearInterval(state.authSave)
                state.authSave = false
            }
            localStorage.setItem('History', JSON.stringify({clock: state.clock, authSave: state.authSave}));
        },
        setClock: (state, value) => {
            state.clock = value
            localStorage.setItem('History', JSON.stringify({clock: state.clock, authSave: state.authSave}));
        }
    }
}
