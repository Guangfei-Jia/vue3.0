<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-02 15:43:57
 * @LastEditors: fei
 * @LastEditTime: 2022-07-14 00:17:02
-->
<template>
  <!-- 角色管理 -->
  <div class="sys-content-wrap">
    <!-- 查询条件form -->
    <el-form
      :inline="true"
      :model="searchParam"
      ref="formSearch"
      class="demo-form-inline"
    >
      <el-form-item label="角色" prop="name">
        <el-input
          v-model="searchParam.name"
          size="medium"
          placeholder="角色"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="clickSearch"
          >查询</el-button
        >
        <el-button size="medium" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询按钮 -->
    <el-button
      class="handle-button"
      type="primary"
      size="medium"
      @click="showDialog"
      >新增</el-button
    >
    <!-- 查询结果table -->
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column
        prop="updatedAt"
        label="创建时间"
        width="152"
      ></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column label="操作" width="239" align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="showDialogRole(scope.row.id)"
            type="primary"
            plain
            :disabled="scope.row.router_type === '3'"
            v-has
            >授权</el-button
          >
          <el-button size="mini" @click="showDialog(scope.row)">编辑</el-button>
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
    <!-- 查询结果分页 -->
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
    <!-- 新增编辑弹窗 -->
    <el-dialog
      :title="'角色管理-' + (formAdd.id ? '编辑' : '新增')"
      v-model="controlDialog"
      destroy-on-close
      @close="cancelDialog"
    >
      <el-form :model="formAdd" ref="formRef" :rules="formAddRules">
        <el-form-item label="角色名称" :label-width="dialogWidth" prop="name">
          <el-input
            v-model="formAdd.name"
            placeholder="请输入角色名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelDialog">取消</el-button>
        <el-button type="primary" @click="handleAddSubmit">确定</el-button>
      </template>
    </el-dialog>
    <!-- 角色授权弹窗 -->
    <el-dialog
      title="账号管理-角色授权"
      v-model="roleDialog"
      destroy-on-close
      @close="cancelDialogTree"
    >
      <el-tree
        ref="treeRef"
        :data="treeData"
        :default-expand-all="true"
        :check-on-click-node="true"
        show-checkbox
        node-key="id"
        :props="defaultProps"
      >
      </el-tree>
      <template #footer>
        <el-button @click="cancelDialogTree">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  inject,
  nextTick,
} from "vue";

import { filterObj, checkResponse } from "@/utils/utils";
import baseList from "@/composables/baseList";
import baseDialog from "@/composables/baseDialog";

import { roleUrl, menuUrl } from "@/api";
import { getAction, postAction } from "@/api/axios";

export default defineComponent({
  data() {
    return {
      formAddRules: {
        //表单验证
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "角色名称最少 2 个字符,最多 20 个字符",
            trigger: "blur",
          },
        ],
      },
      defaultProps: {
        //树配置
        label: "name",
        children: "children",
      },
    };
  },
  setup(props, { attrs, slots, emit, expose }) {
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
    } = baseList(roleUrl);

    const $message = inject<any>("$message");
    const formSearch = ref();
    const formRef = ref();
    const searchParam = reactive({
      //查询角色表单
      name: "",
    });

    //查询触发回调
    const clickSearch = () => {
      getList(filterObj(searchParam));
    };

    //重置查询表单
    const resetForm = () => {
      formSearch.value.resetFields();
      getList(filterObj(searchParam));
    };

    //编辑表单
    const formAdd: any = reactive({
      name: "",
    });

    //对应表单回显的map
    let formData = new Map([
      ["id", ""],
      ["name", ""],
    ]);
    const { dialogWidth, controlDialog, showDialog, cancelDialog } = baseDialog(
      "",
      formAdd,
      formData
    );

    //提交
    const handleAddSubmit = () => {
      formRef.value.validate((res: any) => {
        if (!res) {
          $message?.("error", "输入内容不合法，请查看页面提示信息!");
          return;
        }
        if (formAdd.id) {
          editAction(formAdd, cancelDialog);
        } else {
          addAction(formAdd, cancelDialog);
        }
      });
    };

    const treeData = ref([]);
    const thisId = ref(-1);
    const treeRef = ref();
    // const dialogWidth = ref("100px");
    const roleDialog = ref(false);
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
        let nodes = treeRef.value.getNode(item.menu_id);
        if (nodes.isLeaf) {
          checkedArray.push(item.menu_id);
        }
      });
      treeRef.value.setCheckedKeys(checkedArray); //置空默认勾选的树节点
    };
    const showDialogRole = (id: number) => {
      roleDialog.value = true;
      nextTick(() => {
        //写入操作
        getAllRole(id);
      });
    };

    //获取全部角色列表，初始化当前角色
    const getAllRole = async (id: number) => {
      const res = await postAction(menuUrl.list, {}); //获取全部角色，后期放到缓存中，避免多次调用
      treeData.value = res.data.rows;
      getRole(id);
    };

    //授权提交
    const handleSubmit = async () => {
      let checkArrays = treeRef.value.getCheckedKeys(),
        harfCheckArray = treeRef.value.getHalfCheckedKeys();
      let requestData = {
        role_id: thisId.value,
        menu_ids: checkArrays.concat(harfCheckArray),
      };
      const res = await postAction(roleUrl.menuAdd, requestData);
      if (!checkResponse(res, true)) {
        return false;
      }
      cancelDialogTree();
      getList();
    };
    const cancelDialogTree = () => {
      roleDialog.value = false;
    };
    onMounted(getList);

    return {
      formSearch,
      searchParam,
      clickSearch,
      resetForm,

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

      handleAddSubmit,

      dialogWidth,
      cancelDialog,
      // handleAddSubmit,
      showDialog,
      controlDialog,
      formAdd,
      // showDialogOfEdit,
      formRef,

      treeRef,
      treeData,
      handleSubmit,
      thisId,

      showDialogRole,
      roleDialog,
      cancelDialogTree,
    };
  },
});
</script>

<style lang="scss" scoped>
.handle-button {
  margin-bottom: 10px;
}
.align-right {
  float: right;
  margin: 10px 0 0 0;
}
</style>
