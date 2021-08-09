/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-01 11:56:20
 * @LastEditors: fei
 * @LastEditTime: 2021-08-04 14:25:51
 */
import { setStore, removeStore } from '@/utils/storage';
import { checkResponse } from '@/utils/utils';
import { getUserMenu } from '@/api/public'

export default {
  SET_LOADING(context:any, data:any) {
    context.commit('SET_LOADING', data);
  },

  SET_LOGIN(context:any, data:any) {
    //缓存token和用户信息
    setStore('tokens', data.tokens);
    setStore('userInfo', data.userInfo);
    context.commit('SET_LOGIN', data);
  },

  SET_LOGOUT(context:any, data:any) {
    //缓存token和用户信息
    removeStore('tokens');
    removeStore('userInfo');
    removeStore('menu');
    context.commit('SET_LOGOUT');
  },

  SET_MENU(context:any) {
    return new Promise<void>((resolve, reject) => {
      getUserMenu().then((res:any) => {
        if (!checkResponse(res)) {
          reject();
        }
        setStore('menu', res.data)
        context.commit('SET_MENU', res.data);
        resolve();
      })
    })
  },

  SET_BREAD(context:any, data:any) {
    context.commit('SET_BREAD', data);
  }
};
