<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-07-08 15:13:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-01 14:26:36
-->
<template>
  <div>
      {{title}}
      <div v-for="item in list" :ref="setItemRef" :key="item.id">111</div>

  </div>
</template>
<script lang="ts">
import {defineComponent, onBeforeUpdate, onUpdated} from 'vue';
export default defineComponent({
  data() {
    return {
      title:'欢迎登陆！',
      list:[
        {id:1,name:'1111'},
        {id:2,name:'2222'},
      ]
    };
  },
});
</script>