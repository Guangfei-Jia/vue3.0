<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-21 10:15:07
 * @LastEditors: fei
 * @LastEditTime: 2021-12-21 14:59:41
-->
<template>
  <el-dialog
    title="字典配置"
    :width="900"
    v-model="controlDialog"
    destroy-on-close
    @close="cancelDialog"
  >
    <search @getList="getList" :parent_id="parent_id"></search>
    <el-button
      class="handle-button"
      type="primary"
      size="medium"
      @click="showDialogOfEdit"
      style="margin-bottom:10px"
      >新增</el-button
    >
    <List ref="tableList" :parent_id="parent_id" @showDialogOfEdit="showDialogOfEdit" />
    <edit-dialog  :parent_id="parent_id" ref="editDialog" @getList="getList" @add="add" @edit="edit"></edit-dialog>
  </el-dialog>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  getCurrentInstance,
  toRefs
} from "vue";
import EditDialog from "./components/EditDialog.vue";
import List from './components/List.vue'
import Search from './components/Search.vue'
import baseDialog from "@/composables/baseDialog";
interface SearchData {
  code: string,
  name: string,
  parent_id: number
}
export default defineComponent({
  emits: ["getList"],
  components:{
    List,
    Search,
    EditDialog
  },
  props:{
    parent_id:Number,
  },
  setup(props, context) {
    const { parent_id } = toRefs(props);
    const { dialogWidth, controlDialog, showDialog, cancelDialog } = baseDialog();
    const { proxy } = getCurrentInstance() as any;
    //查询列表
    const getList = (searchParam?: SearchData):void => {
      proxy.$refs.tableList.getList(searchParam);
    };
        //新增、修改 弹窗触发
    const showDialogOfEdit = (data?: any): void => {
      proxy.$refs.editDialog.showDialog( data );
    };
    //新增编辑功能转发
    const add = (parmas: object, callback:() => void, otherFilter?:{}): void => {
      proxy.$refs.tableList.addAction(parmas, callback, otherFilter);
    }
    const edit = (parmas: object, callback:() => void, otherFilter?:{}): void => {
      proxy.$refs.tableList.editAction(parmas, callback, otherFilter);
    }
    return {
      dialogWidth,
      cancelDialog,
      showDialog,
      controlDialog,
      parent_id,
      getList,
      showDialogOfEdit,
      add,
      edit
    };
  },
});
</script>