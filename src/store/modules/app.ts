export default {
  state: {
    appState: '我是app模块状态'
  },
  mutations: {
    SET_APP_STATE(state:any, data:any) {
      state.appState = data.name;
    }
  },
  actions: {
    SET_APP_STATE(context:any, data:any) {
      context.commit('SET_APP_STATE', data);
    }
  }
};
