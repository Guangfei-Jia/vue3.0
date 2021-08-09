/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-06-22 15:29:31
 * @LastEditors: fei
 * @LastEditTime: 2021-08-04 09:43:55
 */
import { createStore, Store } from 'vuex'
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import app from '@/store/modules/app';
import user from '@/store/modules/user';

import { InjectionKey } from 'vue'
// 为 store state 声明类型
export interface State {
  requestLoading: number, //全局loading
  loginState: boolean, //登录状态
  userInfo: string, //用户信息
  menu: Array<object>, //用户菜单
  breadcrumb: Array<object>  //面包屑菜单
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state,
  mutations,
  actions,
  getters,
  modules: {
    app,
    user
  }
})


