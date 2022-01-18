<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-08-09 15:44:55
 * @LastEditors: fei
 * @LastEditTime: 2021-12-16 15:06:01
-->
<template>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="菜单名称" width=""></el-table-column>
      <el-table-column
        prop="router_url"
        label="菜单路由"
        width=""
      ></el-table-column>
      <el-table-column
        prop="outer_url"
        label="外链路由"
        width=""
      ></el-table-column>
      <el-table-column prop="order" label="排序" width="50"></el-table-column>
      <el-table-column prop="router_type" label="类型" width="50">
        <template v-slot="scope">
          {{
            scope.row.router_type === 1
              ? "菜单"
              : scope.row.router_type === 2
              ? "内页"
              : scope.row.router_type === 3
              ? "按钮"
              : ""
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="233" align="center">
        <template v-slot="scope">
          <el-button
            size="mini"
            @click="showDialog('showDialogOfEdit', scope.row, 'child')"
            type="primary"
            plain
            :disabled="scope.row.router_type === 3"
            >添加下级</el-button
          >
          <el-button
            size="mini"
            plain
            @click="showDialog('showDialogOfEdit',scope.row)"
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
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import baseList from "@/composables/baseList"
import { menuUrl  } from '@/api'

type emitList = "getList" | "showDialogOfEdit" | "showDialogOfRole";

export default defineComponent({
  emits: ["getList", "showDialogOfEdit", "showDialogOfRole"],
  setup(props, context) {
    const {list, getList, deleteList, addAction, editAction } = baseList(menuUrl);
     //控制弹窗
    const showDialog= ( dialogName: emitList,data: object, type:string): void => {
      context.emit(dialogName, data, type);
    };
    return {
      showDialog,
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
