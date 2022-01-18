<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-21 10:15:07
 * @LastEditors: fei
 * @LastEditTime: 2021-12-16 15:06:46
-->
<template>
   <el-dialog :title="title" v-model="controlDialog" @close="cancelDialog">
      <el-form :model="formAdd" ref="formRef" :rules="formAddRules" >
        <el-form-item
          label="菜单名称"
          :label-width="dialogWidth"
          prop="name"
        >
          <el-input
            v-model="formAdd.name"
            placeholder="请输入菜单名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="路由地址"
          :label-width="dialogWidth"
          prop="router_url"
        >
          <el-input
            v-model="formAdd.router_url"
            placeholder="请输入路由地址"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="外链地址"
          :label-width="dialogWidth"
          prop="outer_url"
        >
          <el-input
            v-model="formAdd.outer_url"
            placeholder="请输入外链地址"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="路由参数"
          :label-width="dialogWidth"
          prop="router_param"
        >
          <el-input
            v-model="formAdd.router_param"
            placeholder="请输入路由参数"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="路由参数值"
          :label-width="dialogWidth"
          prop="router_param_val"
        >
          <el-input
            v-model="formAdd.router_param_val"
            placeholder="请输入路由参数值"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="菜单类型"
          :label-width="dialogWidth"
          prop="router_type"
        >
            <el-select v-model="formAdd.router_type" placeholder="请选择菜单类型">
                <el-option label="菜单" :value="1"></el-option>
                <el-option label="内页" :value="2"></el-option>
                <el-option label="按钮" :value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item
          label="排序"
          :label-width="dialogWidth"
          prop="order"
        >
          <el-input
            v-model="formAdd.order"
            placeholder="请输入序号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="菜单icon"
          :label-width="dialogWidth"
          prop="icon_url"
        >
          <el-input
            v-model="formAdd.icon_url"
            placeholder="请输入菜单icon"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelDialog">取消</el-button>
        <el-button
          type="primary"
          @click="handleAddSubmit"
          >确定</el-button
        >
      </template>
    </el-dialog>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
} from "vue";
import baseDialog from "@/composables/baseDialog";

export default defineComponent({
  emits: ["getList","add","edit"],
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;
    
    //编辑表单
    const formAdd: any = reactive({
        name: "",
        router_url: "",
        outer_url: "",
        router_param: "",
        router_param_val: "",
        router_type: 1,
        order: "",
        icon_url: "",
        parent_id:""
    });
    //对应表单回显的map
    let formData = new Map([
      ["id", ""],
      ["name", ""],
      ["router_url", ""],
      ["outer_url", ""],
      ["router_param", ""],
      ["router_param_val", ""],
      ["router_type", ""],
      ["order", ""],
      ["icon_url", ""],
    ]);

    const title = computed(() => {return '菜单管理-'+(formAdd.parent_id?'添加子菜单':formAdd.id?'修改':'新增')})
    
    const { dialogWidth, controlDialog, showDialog:showDialogCopy, cancelDialog } = baseDialog("formRef", formAdd, formData);
    const showDialog = (data:any, type:string) => {
        if(type == 'child'){
            showDialogCopy();
            formAdd.parent_id = data.id;
        }else{
            formAdd.parent_id = '';
            showDialogCopy(data);
        }

    }
    //表单提交验证代理
    const handleAddSubmit = () => {
      proxy.$refs.formRef.validate((res:boolean ) => {
        if(!res){
          proxy.$message("error", "输入内容不合法，请查看页面提示信息!");
          return;
        }
        if (formAdd.parent_id || !formAdd.id) {
          context.emit("add", formAdd, cancelDialog);
        } else {
          context.emit("edit", formAdd, cancelDialog);
        }
      });
    };

    //表单验证相关
    const validateUrl = (rule: any, value: string, callback: any) => {
      if (formAdd.router_type == 3) {
        return callback();
      }
      if (
        (!value && !formAdd.outer_url) ||
        (value && formAdd.outer_url)
      ) {
        return callback(new Error("路由地址和外链地址只可填写一个!"));
      }
      callback();
    };
    const validateOuterUrl = (rule: any, value: string, callback: any) => {
      if (formAdd.router_type == 3) {
        return callback();
      }
      if (
        (!value && !formAdd.router_url) ||
        (value && formAdd.router_url)
      ) {
        return callback(new Error("路由地址和外链地址只可填写一个!"));
      }
      callback();
    };
    const validateParam = (rule: any, value: string, callback: any) => {
      if (value && !formAdd.router_url) {
        return callback(new Error("路由不存在，参数将无效，请先填写路由!"));
      }
      callback();
    };
    const validateParamVal = (rule: any, value: string, callback: any) => {
      if (formAdd.router_param && !value) {
        return callback(new Error("存在路由参数，必须填写参数值!"));
      }
      if (value && !formAdd.router_param) {
        return callback(
          new Error("路由参数为空，参数值将无效，请填写路由参数!")
        );
      }
      if (value && !formAdd.router_url) {
        return callback(new Error("路由不存在，参数值将无效，请先填写路由!"));
      }
      callback();
    };

    const formAddRules = reactive({
        name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "菜单名称为 2-20 个字符",
            trigger: "blur",
          },
        ],
        router_url: [{ validator: validateUrl, trigger: "blur" }],
        outer_url: [{ validator: validateOuterUrl, trigger: "blur" }],
        router_param: [{ validator: validateParam, trigger: "blur" }],
        router_param_val: [{ validator: validateParamVal, trigger: "blur" }],
        router_type: [
          { required: true, message: "菜单类型必填", trigger: "blur" },
        ],
        order: [{ required: true, message: "排序必填", trigger: "blur" }],
    });
    return {
      dialogWidth,
      cancelDialog,
      handleAddSubmit,
      showDialog,
      controlDialog,
      formAdd,
      title,
      formAddRules
    };
  },
});
</script>