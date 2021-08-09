import { menuInterface } from '@/utils/interface'
export default {
  SET_LOADING: (state:any, status: number) => {
    // error 的时候重置
    if (status === 0) {
      state.requestLoading = 0;
      return;
    }
    state.requestLoading = status
      ? ++state.requestLoading
      : --state.requestLoading;
  },

  SET_LOGIN: (state:any, loginInfo:any) => {
    state.loginState = true; //设置登录状态
    state.userInfo = loginInfo.userInfo;
  },

  SET_LOGOUT(state:any) {
    state.loginState = false;
    state.userInfo = null;
    state.menu = null;
  },

  SET_MENU(state:any, menu:menuInterface) {
    state.menu = menu;
  },

  SET_BREAD(state:any, bread:any) {
    state.breadcrumb = bread;
  }
};
