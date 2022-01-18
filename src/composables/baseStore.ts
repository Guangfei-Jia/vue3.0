/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-12-22 15:36:08
 * @LastEditors: fei
 * @LastEditTime: 2021-12-23 09:50:03
 */
import { computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store/index";

export const baseStore = () => {
    const store = useStore(key);
    const { requestLoading, loginState, userInfo, menu, breadcrumb } = store.state;
    // const {} = store.getters;

    return {
        requestLoading: computed(() => requestLoading),
        loginState: computed(() => loginState), //登录状态
        userInfo: computed(() => userInfo), //用户信息
        menu: computed(() => menu), //用户菜单
        breadcrumb: computed(() => breadcrumb)  //面包屑菜单


    }
}

export default baseStore;