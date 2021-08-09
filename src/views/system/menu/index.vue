<template>
  <!-- 菜单管理 -->
  <div class="sys-content-wrap">
    <el-button
      class="sys-add-button"
      type="primary"
      size="medium"
      @click="showDialogOfEdit"
      >新增菜单</el-button
    >
    <menu-list
      ref="tableList"
      @getList="getList"
      @showDialogOfEdit="showDialogOfEdit"
    ></menu-list>
    <menu-edit-dialog
       ref="editDialog" @getList="getList" @add="add" @edit="edit"
    ></menu-edit-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance } from "vue";
import MenuList from './components/MenuLists.vue';
import MenuEditDialog from "./components/MenuEditDialogs.vue";

export default defineComponent({
  components: {
    MenuList,
    MenuEditDialog,
  },

  setup() {
    const { proxy } = getCurrentInstance() as any;
    //查询列表
    const getList = () => {
      proxy.$refs.tableList.getList();
    };
    //新增、修改 弹窗触发
    const showDialogOfEdit = (data?: any, type?:string): void => {
      proxy.$refs.editDialog.showDialog( data, type );
    };
    //子元素新增功能转发
    const add = (parmas: object, callback:any): void => {
      proxy.$refs.tableList.addAction(parmas, callback);
    }
    const edit = (parmas: object, callback:() => void): void => {
      proxy.$refs.tableList.editAction(parmas, callback);
    }

    onMounted(getList);

    return {
      showDialogOfEdit,
      getList,
      add,
      edit
    };
  },
});
// import { getMenuList, addMenu, updateMenu, deleteMenu } from "@/api/menu";
// import { checkResponse } from "@/utils/utils";
// import { useRoute } from "vue-router";

// export default {
//   data() {
//     let validateUrl = (rule, value, callback) => {
//       if (this.formAdd.router_type == 3) {
//         return callback();
//       }
//       if (
//         (!value && !this.formAdd.outer_url) ||
//         (value && this.formAdd.outer_url)
//       ) {
//         return callback(new Error("路由地址和外链地址只可填写一个!"));
//       }
//       callback();
//     };
//     let validateOuterUrl = (rule, value, callback) => {
//       if (this.formAdd.router_type == 3) {
//         return callback();
//       }
//       if (
//         (!value && !this.formAdd.router_url) ||
//         (value && this.formAdd.router_url)
//       ) {
//         return callback(new Error("路由地址和外链地址只可填写一个!"));
//       }
//       callback();
//     };
//     let validateParam = (rule, value, callback) => {
//       if (value && !this.formAdd.router_url) {
//         return callback(new Error("路由不存在，参数将无效，请先填写路由!"));
//       }
//       callback();
//     };
//     let validateParamVal = (rule, value, callback) => {
//       if (this.formAdd.router_param && !value) {
//         return callback(new Error("存在路由参数，必须填写参数值!"));
//       }
//       if (value && !this.formAdd.router_param) {
//         return callback(
//           new Error("路由参数为空，参数值将无效，请填写路由参数!")
//         );
//       }
//       if (value && !this.formAdd.router_url) {
//         return callback(new Error("路由不存在，参数值将无效，请先填写路由!"));
//       }
//       callback();
//     };

//     return {
//       menuData: [], //菜单树
//       loadingTable: false, //表格加载中
//       loadingFormAdd: false, //新增按钮加载中
//       loadingFormEdit: false, //编辑按钮加载中

//       formAddText: {
//         //新增表单文本集合
//         title: "新增菜单",
//         cancelText: "取 消",
//         confirmText: "确 定",
//       },
//       formAddVisible: false, //显示新增弹窗
//       formAddLabelWidth: "100px", //新增表单lab宽度

//       formAdd: {
//         name: "",
//         router_url: "",
//         outer_url: "",
//         router_param: "",
//         router_param_val: "",
//         router_type: "",
//         order: "",
//         icon_url: "",
//       },
//       formAddRules: {
//         name: [
//           { required: true, message: "请输入菜单名称", trigger: "blur" },
//           {
//             min: 2,
//             max: 20,
//             message: "菜单名称为 2-20 个字符",
//             trigger: "blur",
//           },
//         ],
//         router_url: [{ validator: validateUrl, trigger: "blur" }],
//         outer_url: [{ validator: validateOuterUrl, trigger: "blur" }],
//         router_param: [{ validator: validateParam, trigger: "blur" }],
//         router_param_val: [{ validator: validateParamVal, trigger: "blur" }],
//         router_type: [
//           { required: true, message: "菜单类型必填", trigger: "blur" },
//         ],
//         order: [{ required: true, message: "排序必填", trigger: "blur" }],
//       },

//       parentId: null, //父id
//     };
//   },
//   created() {
//     this.init();
//   },
//   setup() {
//     const thisRoute = useRoute();
//     return {
//       thisRoute,
//     };
//   },
//   methods: {

//     //编辑触发
//     handleEdit(type, row) {
//       this.handleAddOpen();
//       if (type === "addChildren") {
//         this.parentId = row.id;
//       }
//       if (type === "edit") {
//         //初始化之后再赋值，否则重置表单无效
//         this.$nextTick(() => {
//           this.formAdd = {
//             name: row.name,
//             router_url: row.router_url,
//             outer_url: row.outer_url,
//             router_param: row.router_param,
//             router_param_val: row.router_param_val,
//             router_type: row.router_type,
//             order: row.order,
//             icon_url: row.icon_url,
//           };
//         });
//         this.editId = row.id;
//       }
//     },
//     //重置表单
//     resetForm(formName) {
//       this.$refs[formName].resetFields();
//     },

//     //open角色弹窗
//     handleAddOpen() {
//       this.editId = -1;
//       this.formAddVisible = true;
//     },
//     //关闭弹窗
//     handleAddCancel() {
//       this.resetForm("formAdd");
//       this.formAddVisible = false;
//     },
//     //新增/编辑菜单提交
//     handleAddSubmit() {
//       this.loadingFormAdd = true;
//       this.$refs["formAdd"].validate((valid) => {
//         if (valid) {
//           if (this.editId === -1) {
//             this.addAction(); //新增菜单或子菜单
//           } else {
//             this.editAction(); //编辑
//           }
//         } else {
//           this.loadingFormAdd = false;
//           console.log("error submit!!");
//           return false;
//         }
//       });
//     },
//     //新增实现
//     addAction() {
//       let addData = this.formAdd;
//       if (this.parentId) {
//         Object.assign(addData, { parent_id: this.parentId });
//       }
//       addMenu(addData).then((res) => {
//         this.loadingFormAdd = false;
//         if (!checkResponse(res, true)) {
//           return false;
//         }
//         this.handleAddCancel();
//         this.init();
//       });
//     },
//     //编辑实现
//     editAction() {
//       let updateData = Object.assign({}, this.formAdd, { id: this.editId });
//       updateMenu(updateData).then((res) => {
//         this.loadingFormAdd = false;
//         if (!checkResponse(res, true)) {
//           return false;
//         }
//         this.handleAddCancel();
//         /**
//          * 服务器查询接口比更新接口速度要快
//          * 即刻调用会返回原始历史数据
//          * 此处先使用延迟函数来处理，后面需优化
//          */
//         this.loadingTable = true;
//         setTimeout(this.init, 1000);
//       });
//     },
//   },
// };
</script>

<style scoped lang="scss">
.forms {
  color: $main-color;
  .login-buttons {
    margin-bottom: 20px;
    overflow: hidden;
    span {
      cursor: pointer;
    }
    .left_span {
      float: left;
      margin-left: 5px;
    }
    .right_span {
      margin-right: 5px;
      float: right;
    }
  }
  .sunbit-size {
    width: 100%;
  }
}
</style>