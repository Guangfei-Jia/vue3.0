/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-30 15:22:18
 * @LastEditors: fei
 * @LastEditTime: 2021-08-03 17:00:34
 */
//角色api
export const roleUrl = {
    list: '/role/list',
    add: '/role/add',
    update: '/role/update',
    delete: '/role/delete',
    menuAdd: '/limit/menu/add',
    roleList: '/limit/role/list',
    roleAdd: '/limit/role/add',
}
//菜单api
export const menuUrl = {
    list: '/menu/list',
    add: '/menu/add',
    update: '/menu/update',
    delete: '/menu/delete',
    getRoleMenu: '/limit/menu/list',
}
//用户api
export const userUrl = {
    list: '/user/list',
    add:'/user/add',
    update: '/user/update',
    delete: '/user/delete',
}