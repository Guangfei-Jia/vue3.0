<template>
  <div>
    <!-- 标题logo -->
    <div
      class="sys-title"
      style="transition: width 0.5s"
      :style="{ width: isCollapse ? '65px' : '220px' }"
    >
      <span v-show="!isCollapse">{{ systemName }}</span>
      <!-- <img v-show="isCollapse" class="sys-index-logo" src="../assets/imgs/logo.png" alt="logo"> -->
    </div>
    <div class="sys-right-set">
      <el-dropdown @command="handles">
        <span class="el-dropdown-link">
          <i class="el-icon-setting"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <!-- <el-dropdown-item command="setColor">切换主题</el-dropdown-item> -->
            <el-dropdown-item command="setLogout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span v-if="userInfo">{{ userInfo.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore, mapActions } from "vuex";
import { key } from "@/store/index";

import routerFunction from "@/composables/routerFunction";
export default defineComponent({
  name: "LayoutHeader",
  data() {
    return {
      systemName: "管理系统", //系统标题
    };
  },
  props: ["isCollapse"],
  setup() {
    const { userInfo } = useStore(key).state;
    let newuserinfo = userInfo;
    if (typeof userInfo == "string") {
      newuserinfo = JSON.parse(userInfo);
    }
    const { toSelf, toLogin } = routerFunction();
    return {
      toSelf,
      toLogin,
      userInfo: newuserinfo,
    };
  },
  methods: {
    ...mapActions(["SET_LOGOUT", "SET_BREAD"]),

    handles(command: string) {
      //退出登陆
      if (command === "setLogout") {
        this.SET_LOGOUT();
        this.toLogin();
      }
      //个人设置
      if (command === "setting") {
        this.toSelf();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@mixin titlestyle {
  height: 60px;
  line-height: 60px;
  color: $white-color;
  background-color: $main-color;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}
.el-container {
  overflow: scroll;
}

.sys-title {
  @include titlestyle;
  float: left;
  &::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 15px;
    background: url("../../assets/imgs/logo.png");
    background-size: cover;
    width: 30px;
    height: 30px;
  }
}
.sys-right-set {
  float: right;
  margin-right: 20px;
  height: 60px;
  line-height: 60px;
  .el-icon-setting {
    cursor: pointer;
    margin-right: 15px;
  }
}
</style>
