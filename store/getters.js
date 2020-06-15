const getters = {
    token: state => state.user.token,
    user: state => state.user.user,
    nowWork: state => state.user.nowWork
};
export default getters;