import { getAction, postAction, putAction, deleteAction} from '@/api/axios'
// import axios from '@/utils/request';

export const url = {
    list: '/role/list',
    add: '/role/add',
    update: '/role/update',
    delete: '/role/delete',
    menuAdd: '/limit/menu/add',
    roleList: '/limit/role/list',
    roleAdd: '/limit/role/add',
}

//角色列表条件查询
export function getRoleList(data:object){
    return postAction(url.list, data);
}
//新增角色
export function addRole(data:object){
    return postAction(url.add, data);
}
//修改角色
export function updateRole(data:object){
    return putAction(url.update, data);
}
//删除角色
export function deleteRole(data:object){
    return deleteAction(url.delete, data);
}

//角色授权菜单
export function setRole(data: object){
    return postAction(url.menuAdd, data);
}

//查询账号已拥有的角色列表
export function getUserRole(data: object){
    return getAction(url.roleList, data)
    // return axios.get('/limit/role/list/' + id);
}

//用户授权角色
export function setUserRole(data: object){
    return getAction(url.roleAdd, data);
    // return axios.post('/limit/role/add', data);
}
