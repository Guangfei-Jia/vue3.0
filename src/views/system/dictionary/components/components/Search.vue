<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-11-08 16:39:04
 * @LastEditors: fei
 * @LastEditTime: 2021-12-20 10:52:40
-->
<template>
  <el-form
    :inline="true"
    :model="searchParam"
    ref="formSearch"
    class="demo-form-inline"
  >
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item label="字典编码" prop="code" style="width:100%">
          <el-input
            v-model="searchParam.code"
            size="medium"
            placeholder="字典编码"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="字典名称" prop="name" style="width:100%">
          <el-input
            v-model="searchParam.name"
            size="medium"
            placeholder="字典名称"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-form-item>
        <el-button type="primary" size="medium" @click="clickSearch"
          >查询</el-button
        >
        <el-button size="medium" @click="resetForm('formSearch')"
          >重置</el-button
        >
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, toRefs } from "vue";
import { filterObj } from '@/utils/utils';
export default defineComponent({
  emits: ["getList"],
  props:{
    parent_id:Number
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;
    const {parent_id} = toRefs(props);
    const searchParam = reactive({
      //查询角色表单
      code: "",
      name: "",
      parent_id: parent_id.value
    });

    //查询触发回调
    const clickSearch = () => {
      context.emit("getList", filterObj(searchParam));
    };

    //重置查询表单
    const resetForm = (formSearch: string) => {
      const form: any = proxy.$refs[formSearch];
      form.resetFields();
      context.emit("getList", filterObj(searchParam));
    };

    return {
      searchParam,
      clickSearch,
      resetForm,
    };
  },
});
</script>
