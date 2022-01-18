/*
 * @Descripttion: 路由跳转统一维护
 * @version: 1.0
 * @Author: fei
 * @Date: 2021-12-22 14:05:32
 * @LastEditors: fei
 * @LastEditTime: 2021-12-22 14:27:55
 */
import { useRouter } from 'vue-router'

const baseRoutre = () => {
    const router = useRouter()

    //登陆页
    const toLogin = () => {
        router.push('/logins/login');
    }

    //个人设置页
    const toSelf = () => {
        router.push('/system/self');
    }

    return {
        toLogin,
        toSelf
    }
}
export default baseRoutre;