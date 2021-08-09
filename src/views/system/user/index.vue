<template>
  <!-- 用户管理 -->
  <div class="sys-content-wrap">
    <user-search @getList="getList"></user-search>
    <user-list
      ref="tableList"
      @getList="getList"
      @showDialogOfEdit="showDialogOfEdit"
      @showDialogOfRole="showDialogOfRole"
    ></user-list>
    <user-edit-dialog
       ref="editDialog" @getList="getList" @add="add" @edit="edit"
    ></user-edit-dialog>
    <user-role-dialog ref="roleDialog" @getList="getList" @add="add"></user-role-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance } from "vue";
import UserSearch from "./components/UserSearch.vue";
import UserList from "./components/UserList.vue";
import UserEditDialog from "./components/UserEditDialog.vue";
import UserRoleDialog from "./components/UserRoleDialog.vue";
interface SearchData {
  name: string
}
export default defineComponent({
  components: {
    UserSearch,
    UserList,
    UserEditDialog,
    UserRoleDialog,
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
<style scoped>
.align-right {
  margin-top: 10px;
  float: right;
}
</style>