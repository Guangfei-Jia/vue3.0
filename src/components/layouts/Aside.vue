        
<template>
  <div>
    <!-- 菜单 -->
    <el-menu
      style="border: none"
      :collapse="isCollapse"
      @select="handleSelect"
      :router="ifRouter"
      :unique-opened="true"
      :default-active="activeIndex"
    >
      <template v-for="item in menu">
        <!-- 一级菜单 -->
        <el-menu-item
          :index="item.router_url"
          v-if="!ifShowMenu(item)"
          :key="item.id"
        >
          <i class="el-icon-setting"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
        <el-submenu
          :index="item.router_url"
          v-if="ifShowMenu(item)"
          :key="item.id"
        >
          <template #title>
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <template v-for="item_child in item.children">
            <!-- 二级菜单 -->
            <el-menu-item
              :index="item_child.router_url"
              v-if="!ifShowMenu(item_child)"
              :key="item_child.id"
            >
              <span>{{ item_child.name }}</span>
            </el-menu-item>
            <el-submenu
              :index="item_child.router_url"
              v-if="ifShowMenu(item_child)"
              :key="item_child.id"
            >
              <span slot="title">{{ item_child.name }}</span>
              <!-- 三级菜单 -->
              <template v-for="item_child_child in item_child.children">
                <el-menu-item
                  :index="item_child_child.router_url"
                  v-if="item_child_child.router_type === 1"
                  :key="item_child_child.id"
                >
                  {{ item_child_child.name }}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
    <!-- 控制收缩菜单 -->
    <div
      style="transition: width 0.5s"
      :style="{ width: isCollapse ? '65px' : '220px' }"
      class="sys-menu-control"
      @click="handleCollapse"
    >
      <span v-show="!isCollapse">&lt</span>
      <span v-show="isCollapse">&gt</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import routerFunction from "@/composables/routerFunction";
import { useStore, mapActions } from "vuex";
import { menuInterface } from "@/utils/interface";
import { key } from "@/store/index";

export default defineComponent({
  name: "LayoutAside",
  data() {
    return {
      ifRouter: true, //开启router 模式
      activeIndex: "/",
    };
  },
  props: ["isCollapse"],
  watch: {
    $route: function (to, from) {
      this.activeIndex = to.path; //监听url更新，控制菜单选中状态
    },
  },
  emits: ["changeCollapse"],
  setup() {
    const { toSelf, toLogin } = routerFunction();
    const { menu } = useStore(key).state;
    let menuList = menu;

    if (typeof menu == "string") {
      let menuObj = JSON.parse(`{"arrays":${menu}}`);
      menuList = menuObj.arrays;
    }
    const router = useRouter();
    const route = useRoute();
    let activeIndex = ref("");

    activeIndex.value = route.path;

    const handleSelect = (key: string, keyPath: string) => {
      router.push({
        name: "Login",
      });
    };
    // this.activeIndex = this.$route.path;  //刷新界面菜单更新选中状态
    return {
      toSelf,
      toLogin,
      menu: menuList,
      activeIndex,
      handleSelect,
    };
  },
  computed: {
    ifShowMenu: function (): Function {
      return function (item: any) {
        let hasChild = false;
        if (item.children) {
          if (item.children.length === 0 && item.router_type === "1") {
            hasChild = false;
          }
          if (item.children.length > 0) {
            //有子菜单,且子菜单至少有一个是菜单，即router_type===1
            let atLeastOne = item.children.some((val: menuInterface) => {
              return val.router_type === "1";
            });
            if (atLeastOne) {
              hasChild = true;
            } else {
              hasChild = false;
            }
          }
        }
        return item.router_type === "1" && hasChild;
      };
    },
  },
  methods: {
    ...mapActions(["SET_LOGOUT", "SET_BREAD"]),

    //控制菜单缩放
    handleCollapse(): void {
      this.$emit("changeCollapse");
    },
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
.sys-menu-control {
  @include titlestyle;
  position: fixed;
  bottom: 0;
}
</style>
