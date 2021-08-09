<template>
  <el-dialog
    title="编辑"
    v-model="controlDialog"
    destroy-on-close
    @close="cancelDialog"
  >
    <el-form :model="formAdd" ref="formRef" :rules="formAddRules">
      <el-form-item label="姓名" :label-width="dialogWidth" prop="name">
        <el-input
          v-model="formAdd.name"
          placeholder="请输入姓名"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号"
        :label-width="dialogWidth"
        prop="mobile"
      >
        <el-input
          v-model="formAdd.mobile"
          placeholder="请输入手机号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="dialogWidth" prop="email">
        <el-input
          v-model="formAdd.email"
          placeholder="请输入邮箱"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号描述" :label-width="dialogWidth" prop="bz">
        <el-input
          v-model="formAdd.bz"
          placeholder="请输入账号描述"
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
    const validateEmail = (rule: any, value: string, callback: any) => {
      var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!reg.test(value)) {
        callback(new Error("请输入正确格式的邮箱！"));
      } else {
        callback();
      }
    };
    const validateMobile = (rule: any, value: string, callback: any) => {
      if (!value) {
        callback();
      }
      var reg = /^[1][0-9]{10}$/;
      if (!reg.test(value)) {
        callback(new Error("请输正确手机号！"));
      } else {
        callback();
      }
    };
    return {
      //表单验证
      formAddRules: {
        name: [
          {
            min: 2,
            max: 20,
            message: "角色名称最少 2 个字符,最多 20 个字符",
            trigger: "blur",
          },
        ],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" },
        ],
      },
    };
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;
     //编辑表单
    const formAdd: any = reactive({
      name: '',
      mobile: '',
      email: '',
      bz: '',
    });
    //对应表单回显的map
    let formData = new Map([
      ["id", ""],
      ["name", ""],
      ["mobile", ""],
      ["email", ""],
      ["bz", ""],
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