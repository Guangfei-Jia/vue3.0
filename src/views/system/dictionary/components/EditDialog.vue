<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-21 10:15:07
 * @LastEditors: fei
 * @LastEditTime: 2021-12-16 15:24:49
-->
<template>
  <el-dialog
    :title="'字典管理-'+(formAdd.id?'编辑':'新增')"
    v-model="controlDialog"
    destroy-on-close
    @close="cancelDialog"
  >
    <el-form :model="formAdd" ref="formRef" :rules="formAddRules">
      <el-form-item label="字典代码" :label-width="dialogWidth" prop="code">
        <el-input
          v-model="formAdd.code"
          placeholder="请输入字典代码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="字典名称" :label-width="dialogWidth" prop="name">
        <el-input
          v-model="formAdd.name"
          placeholder="请输入字典名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="字典描述" :label-width="dialogWidth" prop="description">
        <el-input
          v-model="formAdd.description"
          type="textarea"
          :rows="4"
          placeholder="请输入字典描述"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancelDialog">取消</el-button>
      <el-button type="primary" @click="handleAddSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
} from "vue";
import baseDialog from "@/composables/baseDialog";

export default defineComponent({
  emits: ["getList","add","edit"],
  data() {
    return {
      formAddRules: {
        //表单验证
        code: [
          { required: true, message: "请输入字典代码", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "字典代码最少 2 个字符,最多 20 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入字典名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "字典名称最少 2 个字符,最多 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;

    //编辑表单
    const formAdd: any = reactive({
      code: "",
      name: "",
      description: "",
    });
    //对应表单回显的map
    let formData = new Map([
      ["id", ""],
      ["code", ""],
      ["name", ""],
      ["description", ""],
    ]);
    const { dialogWidth, controlDialog, showDialog, cancelDialog } = baseDialog("formRef", formAdd, formData);

    //表单提交验证代理
    const handleAddSubmit = () => {
      proxy.$refs.formRef.validate((res:boolean ) => {
        if(!res){
          proxy.$message("error", "输入内容不合法，请查看页面提示信息!");
          return;
        }
        if (formAdd.id) {
          context.emit("edit", formAdd, cancelDialog);
        } else {
          context.emit("add", formAdd, cancelDialog);
        }
      });
    };
    return {
      dialogWidth,
      cancelDialog,
      handleAddSubmit,
      showDialog,
      controlDialog,
      formAdd,
    };
  },
});
</script>