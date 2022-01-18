<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-19 10:08:58
 * @LastEditors: fei
 * @LastEditTime: 2021-08-04 14:19:08
-->
<template>
  <el-dialog
    title="分配角色"
    v-model="controlDialog"
    destroy-on-close
    @close="cancelDialog"
  >
    <el-form :model="formAddRole" ref="formRef">
      <el-form-item>
        <el-checkbox-group v-model="formAddRole.role_id" prop="role_id">
          <el-checkbox
            v-for="item in list"
            :key="item.id"
            :label="item.id"
            name="role_id"
            size="medium"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
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
  onMounted,
  nextTick,
  reactive,
} from "vue";
import { roleUrl } from "@/api";
import { checkResponse } from "@/utils/utils";
import baseDialog from "@/composables/baseDialog";
import { getAction, postAction } from "@/api/axios";
import baseList from "@/composables/baseList";

export default defineComponent({
  emits: ["getList", "add"],
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;

    const formAddRole: any = reactive({
      role_id: [],
    });
    const formDataRole = new Map([
      ["id", ""],
      ["role_id", ""],
    ]);

    const {
      controlDialog,
      showDialog: showDialogCopy,
      cancelDialog,
    } = baseDialog("formRef", formAddRole, formDataRole);
    const { list, getList: checkList } = baseList(roleUrl);

    //分配角色
    const showDialog = async (id: number) => {
      showDialogCopy();
      const res = await getAction(roleUrl.roleList, { id });
      nextTick(() => {
        let list = res.data || [],
          checkedArray: any[] = [];
        list.forEach((item: any) => {
          checkedArray.push(item.role_id);
        });
        formAddRole.role_id = checkedArray;
        formAddRole.id = id;
      });
    };
    // 表单提交验证代理
    const handleAddSubmit = () => {
      //两个参数，新增、修改对应函数
      proxy.$refs.formRef.validate(async (val:boolean ) => {
        if(!val){
          proxy.$message("error", "输入内容不合法，请查看页面提示信息!");
          return;
        }
        const res = await postAction(roleUrl.roleAdd, formAddRole);
        if (!checkResponse(res, true)) {
          return false;
        }
        cancelDialog();
        context.emit("getList");
      });

    };

    onMounted(() => {checkList({})});

    return {
      controlDialog,
      formAddRole,
      showDialog,
      cancelDialog,
      list,
      handleAddSubmit,
    };
  },
});
</script>