<template>
  <el-form :inline="true" :model="searchParam" ref="formSearch" class="demo-form-inline">
    <el-form-item label="角色" prop="name">
      <el-input v-model="searchParam.name" size="medium" placeholder="角色"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="medium" @click="clickSearch">查询</el-button>
      <el-button size="medium" @click="resetForm('formSearch')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from "vue";
import { filterObj } from '@/utils/utils';

export default defineComponent({
  emits: ["getList"],
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;

    const searchParam = reactive({
      //查询角色表单
      name: "",
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