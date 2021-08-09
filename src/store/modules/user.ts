/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-01 11:55:56
 * @LastEditors: fei
 * @LastEditTime: 2021-08-04 14:26:37
 */
export default {
  state: {
    userState: '我是user模块状态'
  },
  mutations: {
    SET_USER_STATE(state:any, data:any) {
      state.userState = data.name;
    }
  },
  actions: {
    SET_USER_STATE(context:any, data:any) {
      const {commit} = context;
      setTimeout(() => {
        commit('SET_USER_STATE', data);
      }, 1000);
    }
  }
};
