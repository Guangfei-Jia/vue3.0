<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-13 16:27:45
 * @LastEditors: fei
 * @LastEditTime: 2021-08-04 14:18:10
-->
<template>
  <el-table :data="list" stripe border style="width: 100%">
    <el-table-column prop="head_thumb" label="头像" align="center" width="100">
      <template v-slot="scope">
        <img
          alt="头像"
          style="width: 32px; height: 32px"
          src="../../../../assets/imgs/logo.png"
          v-real-img="scope.row.head_thumb"
        />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column
      prop="username"
      label="登录账号"
      width="150"
    ></el-table-column>
    <el-table-column prop="mobile" label="手机号"></el-table-column>
    <el-table-column label="操作" width="234">
      <template #default="scope">
        <el-button
          size="mini"
          @click="showDialog('showDialogOfRole',scope.row)"
          type="primary"
          plain
          :disabled="scope.row.router_type === '3'"
          v-has
          >分配角色</el-button>
        <el-button size="mini" @click="showDialog('showDialogOfEdit',scope.row)" v-has >编辑</el-button>
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
</template>
<script lang="ts">
import { defineComponent } from "vue";
import baseList from "@/composables/baseList"
import { userUrl  } from '@/api'

type emitList = "getList" | "showDialogOfEdit" | "showDialogOfRole";

export default defineComponent({
  emits: ["getList", "showDialogOfEdit", "showDialogOfRole"],
  setup(props, context) {
    const { currentPage, pageData, changeSize, changePage, list, getList, deleteList, addAction, editAction } = baseList(userUrl);
     //控制弹窗
    const showDialog= ( dialogName: emitList,data: object): void => {
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