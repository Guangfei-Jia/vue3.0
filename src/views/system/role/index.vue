<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-02 15:43:57
 * @LastEditors: fei
 * @LastEditTime: 2021-08-03 15:02:19
-->
<template>
  <!-- 角色管理 -->
  <div class="sys-content-wrap">
    <role-search @getList="getList"></role-search>
    <el-button
      class="handle-button"
      type="primary"
      size="medium"
      @click="showDialogOfEdit"
      >新增</el-button
    >
    <role-list
      ref="tableList"
      @getList="getList"
      @showDialogOfEdit="showDialogOfEdit"
      @showDialogOfRole="showDialogOfRole"
    ></role-list>
    <role-edit-dialog ref="editDialog" @getList="getList" @add="add" @edit="edit"></role-edit-dialog>
    <role-tree-dialog ref="roleDialog" @getList="getList"></role-tree-dialog>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
} from "vue";
import RoleEditDialog from "./components/RoleEditDialog.vue";
import RoleList from "./components/RoleList.vue";
import RoleSearch from "./components/RoleSearch.vue";
import RoleTreeDialog from "./components/RoleTreeDialog.vue";
interface SearchData {
  name: string
}
export default defineComponent({
  components: {
    RoleEditDialog,
    RoleList,
    RoleSearch,
    RoleTreeDialog,
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    //查询列表
    const getList = (searchParam?: SearchData):void => {
      proxy.$refs.tableList.getList(searchParam);
    };
    //新增、修改 弹窗触发
    const showDialogOfEdit = (data?: any): void => {
      proxy.$refs.editDialog.showDialog( data );
    };
    //子元素新增功能转发
    const add = (parmas: object, callback:any): void => {
      proxy.$refs.tableList.addAction(parmas, callback);
    }
    const edit = (parmas: object, callback:() => void): void => {
      proxy.$refs.tableList.editAction(parmas, callback);
    }
    
    //授权 弹窗触发
    const showDialogOfRole = (row: any): void => {
      proxy.$refs.roleDialog.showDialog( row.id );
    };

    onMounted(getList);

    return {
      showDialogOfRole,
      showDialogOfEdit,
      getList,
      add,
      edit
    };
  },
});
</script>

<style lang="scss" scoped>
   .handle-button{
     margin-bottom:10px
   }
</style>