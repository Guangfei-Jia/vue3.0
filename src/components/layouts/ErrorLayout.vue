<!--
 * @Descripttion: 404页面框架
 * @version: 
 * @Author: fei
 * @Date: 2021-08-09 15:44:55
 * @LastEditors: fei
 * @LastEditTime: 2021-12-22 16:55:27
-->
<template>
  <el-container class="contant">
      <el-row type="flex" justify="center">
            <router-view />
      </el-row>
  </el-container>
</template>

<script lang="ts">
export default {
  name: "ErrorLayout",
  data() {
    return {
      systermName: "管理系统",
    };
  },
};
</script>