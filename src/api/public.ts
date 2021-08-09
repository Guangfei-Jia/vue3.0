import axios from '@/utils/request';
import { getAction, postAction, putAction, deleteAction} from '@/api/axios'
//首页
export function home() {
  return axios.get('/home');
}

//登陆
export function login(data:any) {
  return axios.post('/login', data);
}

//注册
export function register(data:any) {
  return axios.post('/register', data);
}

//发送修改密码邮件
export function sendMail(data:any) {
  return axios.post('/sendMail', data);
}

//获取登陆菜单
export function getUserMenu() {
  return axios.get('/userMenuList');
}

//刷新token
export function refreshAccessToken(refreshToken: string) {
  return axios.post('/refreshAccessToken', { refreshToken: refreshToken });
}

//个人设置
export function updateSelf(data:any){
  return axios.put('/user/updateSelf', data);
}

//根据id获取当前登陆用户信息
export function userDetail(id: number){
  return axios.get('/user/detail/' + id);
}

