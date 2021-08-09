/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-01 11:56:46
 * @LastEditors: fei
 * @LastEditTime: 2021-08-04 09:43:38
 */
import { getStore } from '@/utils/storage';
let userInfo =  getStore('userInfo');
let menu = JSON.parse(JSON.stringify(getStore('menu')));
export default {
  requestLoading: 0, //全局loading
  loginState: !!userInfo, //登录状态
  userInfo: userInfo, //用户信息
  menu: menu, //用户菜单
  breadcrumb: []  //面包屑菜单
};
