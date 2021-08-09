import { useRouter } from 'vue-router'
//公用路由跳转逻辑
export default function loginFunction(){
    const router = useRouter()

     //返回登陆页
     const toLogin = () => {
        router.push('/logins/login');
    }

    //个人设置
    const toSelf = () => {
        router.push('/system/self');
    }
    
    return {
        toLogin,
        toSelf
    }
}