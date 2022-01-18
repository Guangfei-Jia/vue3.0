<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-02 15:43:57
 * @LastEditors: fei
 * @LastEditTime: 2021-12-21 14:58:08
-->
<template>
  <!-- 字典表管理 -->
  <div class="sys-content-wrap">
    <search @getList="getList"></search>
    <el-button
      class="handle-button"
      type="primary"
      size="medium"
      @click="showDialogOfEdit"
      >新增</el-button
    >
    <list
      ref="tableList"
      @getList="getList"
      @showDialogOfEdit="showDialogOfEdit"
      @showDialogChild="showDialogChild"
    ></list>
    <edit-dialog ref="editDialog" @getList="getList" @add="add" @edit="edit"></edit-dialog>
    <child-edit-dialog ref="childDialog" :parent_id="parent_id"></child-edit-dialog>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  ref
} from "vue";
import EditDialog from "./components/EditDialog.vue";
import ChildEditDialog from "./components/ChildEditDialog.vue";
import List from "./components/List.vue";
import Search from "./components/Search.vue";
interface SearchData {
  code: string,
  name: string,
}
export default defineComponent({
  components: {
    EditDialog,
    List,
    Search,
    ChildEditDialog,
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
    //新增编辑功能转发
    const add = (parmas: object, callback:any): void => {
      proxy.$refs.tableList.addAction(parmas, callback);
    }
    const edit = (parmas: object, callback:() => void): void => {
      proxy.$refs.tableList.editAction(parmas, callback);
    }
    //字典配置弹窗
    const parent_id = ref(0);
    const showDialogChild = (data?: any): void => {
      parent_id.value = data.id;
      proxy.$refs.childDialog.showDialog( data );
    };
    
    onMounted(getList);

    return {
      showDialogOfEdit,
      getList,
      add,
      edit,
      showDialogChild,
      parent_id
    };
  },
});
</script>

<style lang="scss" scoped>
   .handle-button{
     margin-bottom:10px
   }
</style>