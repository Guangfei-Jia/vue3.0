<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-19 10:08:58
 * @LastEditors: fei
 * @LastEditTime: 2021-08-04 10:28:12
-->
<template>
  <el-dialog title="账号管理-角色授权" v-model="controlDialog" destroy-on-close @close="cancelDialog">
    <el-tree
      ref="tree"
      :data="treeData"
      :default-expand-all="true"
      :check-on-click-node="true"
      show-checkbox
      node-key="id"
      :props="defaultProps"
    >
    </el-tree>
    <template #footer>
      <el-button @click="cancelDialog">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, getCurrentInstance } from "vue";

import { roleUrl, menuUrl } from "@/api";
import { getAction, postAction } from "@/api/axios";
import { checkResponse } from "@/utils/utils";
import baseDialog from "@/composables/baseDialog";

export default defineComponent({
  data() {
    return {
      defaultProps: {
        //树配置
        label: "name",
        children: "children",
      },
    };
  },
  emits: ["getList"],
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;
    const treeData = ref([]);
    const thisId = ref(-1);
    const {
      controlDialog,
      showDialog: showDialogCopy,
      cancelDialog,
    } = baseDialog();
    //获取当前id对应的树结构
    const getRole = async (id: number) => {
      thisId.value = id;
      const res = await getAction(menuUrl.getRoleMenu, { id });
      if (!checkResponse(res)) {
        return false;
      }
      //弹窗组件初始化后，已有角色勾选
      let list = res.data || [],
        checkedArray: Array<number> = [];
      list.forEach((item: any) => {
        let nodes = proxy.$refs.tree.getNode(item.menu_id);
        if (nodes.isLeaf) {
          checkedArray.push(item.menu_id);
        }
      });
      proxy.$refs.tree.setCheckedKeys(checkedArray); //置空默认勾选的树节点
    };
    const showDialog = (id: number) => {
      showDialogCopy();
      getRole(id);
    };

    //获取全部角色列表
    const getAllRole = async () => {
      const res = await postAction(menuUrl.list, {});
      treeData.value = res.data.rows;
    };

    //授权提交
    const handleSubmit = async () => {
      let checkArrays = proxy.$refs.tree.getCheckedKeys(),
        harfCheckArray = proxy.$refs.tree.getHalfCheckedKeys();
      let requestData = {
        role_id: thisId.value,
        menu_ids: checkArrays.concat(harfCheckArray),
      };
      const res = await postAction(roleUrl.menuAdd, requestData);
      if (!checkResponse(res, true)) {
        return false;
      }
      cancelDialog();
      context.emit("getList");
    };

    onMounted(getAllRole);

    return {
      controlDialog,
      showDialog,
      cancelDialog,
      treeData,
      handleSubmit,
      thisId,
    };
  },
});
</script>