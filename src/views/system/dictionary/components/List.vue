<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-13 16:27:45
 * @LastEditors: fei
 * @LastEditTime: 2021-12-21 14:59:06
-->
<template>
  <div>
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column prop="code" label="字典代码"></el-table-column>
      <el-table-column prop="name" label="字典名称"></el-table-column>
      <el-table-column prop="description" label="字典简介">
        <template #default="scope">
          {{ scope.row.description.length > 10 ? `${scope.row.description.slice(0, 10)}...` :  scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="152"
      ></el-table-column>
      <el-table-column label="操作" width="240" align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="showDialog('showDialogOfEdit', scope.row)"
            v-has
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="primary"
            plain
            @click="showDialog('showDialogChild', scope.row)"
            v-has
            >字典配置</el-button
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
      @size-change="(e) => changeSize(e, getList)"
      @current-change="(e) => changePage(e, getList)"
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

import { defineComponent } from "vue";
import baseList from "@/composables/baseList";
import { dectionaryUrl } from "@/api";

export default defineComponent({
  emits: ["getList", "showDialogOfEdit", "showDialogChild"],
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
    } = baseList(dectionaryUrl);
    //控制弹窗
    const showDialog = (dialogName: emitList, data: object): void => {
      context.emit(dialogName, data);
    };
    return {
      showDialog,

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
    };
  },
});
</script>

<style scoped lang="scss">
.align-right {
  float: right;
  margin: 20px 0 0 0;
}
</style>
