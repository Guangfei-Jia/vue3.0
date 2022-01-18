<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-13 16:27:45
 * @LastEditors: fei
 * @LastEditTime: 2021-12-20 10:51:42
-->
<template>
  <div class="div-wrap">
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column prop="code" label="数据代码"></el-table-column>
      <el-table-column prop="name" label="数据名称"></el-table-column>
      <el-table-column prop="description" label="数据简介">
        <template #default="scope">
          {{ scope.row.description.length > 10 ? `${scope.row.description.slice(0, 10)}...` :  scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="152"
      ></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="showDialog('showDialogOfEdit', scope.row)"
            v-has
            >编辑</el-button
          >
          <el-popconfirm
            style="margin-left: 10px"
            confirmButtonText="确定"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @confirm="deleteList(scope.row.id)"
          >
            <template #reference>
              <el-button size="mini" type="danger" v-has>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="align-right"
      @size-change="(e) => changeSize(e, ()=>getList({parent_id}))"
      @current-change="(e) => changePage(e, ()=>getList({parent_id}))"
      :current-page="currentPage"
      :page-sizes="pageData.pageSizes"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
type emitList = "getList" | "showDialogOfEdit";

import { defineComponent, onMounted, toRefs } from "vue";
import baseList from "@/composables/baseList";
import { dectionaryChildUrl } from "@/api";

export default defineComponent({
  emits: ["getList", "showDialogOfEdit", "showchildDialog"],
  props:{
    parent_id:Number
  },
  setup(props, context) {
    const {
      currentPage,
      pageData,
      changeSize,
      changePage,
      list,
      getList,
      deleteList,
      addAction,
      editAction,
    } = baseList(dectionaryChildUrl);
    //控制弹窗
    const showDialog = (dialogName: emitList, data: object): void => {
      context.emit(dialogName, data);
    };
    const { parent_id } = toRefs(props);
    onMounted(() => {
      getList({parent_id:parent_id.value})
    });
    return {

      //分页相关
      currentPage,
      pageData,
      changeSize,
      changePage,
      //列表相关
      list,
      getList,
      addAction,
      editAction,
      deleteList,
      showDialog,
      parent_id
    };
  },
});
</script>

<style scoped lang="scss">
.align-right {
  float: right;
  margin: 20px 0 0 0;
}
.div-wrap{
  overflow: hidden;
}
</style>
