/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-08-09 15:44:55
 * @LastEditors: fei
 * @LastEditTime: 2022-06-22 09:43:32
 */
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  interface State {
    count: number
  }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>,
    $message: (str1: string, str2: string) => object,
  }
}