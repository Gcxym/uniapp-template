import { login, logout, getInfo } from '@/api/login';

const user = {
    state: {
        token: uni.getStorageSync('SET_TOKEN'),
        user: uni.getStorageSync('SET_USER'),
        nowWork: uni.getStorageSync('SET_NOWWORK'),
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_NOWWORK: (state, nowWork) => {
            state.nowWork = nowWork;
        },
        logout(state) {
            state.token = null
        }
    },
    actions: {
        // 3.获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo()
                    .then(res => {
                        const user = res.user;
                        const nowWork = res.works
                        try {
                            uni.setStorageSync('SET_USER', user);
                            uni.setStorageSync('SET_NOWWORK', nowWork[0]);
                        } catch (e) {
                            console.log(e)
                        }
                        commit('SET_USER', user);
                        commit('SET_NOWWORK', nowWork[0]);
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },

        Login({ commit, dispatch }, params) {
            return new Promise((resolve, reject) => {
                let url = `/login?username=${params.username}&password=${params.password}&uuid=${params.uuid}`
                login(url).then(res => {
                    try {
                        uni.setStorageSync('SET_TOKEN', res.token);
                    } catch (e) {
                        console.log(e)
                    }
                    commit('SET_TOKEN', res.token);
                    dispatch('GetInfo')
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            })
        },
        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token)
                    .then(() => {
                        commit('SET_TOKEN', '');
                        commit('SET_USER', '');
                        uni.removeStorageSync('SET_TOKEN');
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
    },
}

export default user
