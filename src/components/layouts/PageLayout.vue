<template>
  <div style="height: 100%">
    <el-container class="wrap">
      <el-aside
        class="sys-aside"
        style="transition: width 0.5s; background-color: #fff"
        :width="isCollapse ? '65px' : '220px'"
      >
        <Aside :isCollapse="isCollapse" @changeCollapse="changeCollapse" />
      </el-aside>
      <el-container>
        <el-header class="sys-header">
          <Header :isCollapse="isCollapse" />
        </el-header>
        <el-main
          style="transition: padding-left 0.5s; background-color: #f0f2f5"
          :style="{ paddingLeft: isCollapse ? '85px' : '240px' }"
        >
          <el-main style="background-color: #fff">
            <router-view></router-view>
          </el-main>
        </el-main>
      </el-container>
    </el-container>
    <!-- 全局引入loading -->
    <RequestLoading />
  </div>
</template>

<script lang="ts">
import Header from "@/components/layouts/Header.vue";
import Aside from "@/components/layouts/Aside.vue";
import RequestLoading from "@/components/RequestLoading.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageLayout",
  components: {
    Header,
    Aside,
    RequestLoading,
  },
  data() {
    return {
      isCollapse: false, //控制菜单展开和收缩
    };
  },
  methods: {
    changeCollapse(): void {
      this.isCollapse = !this.isCollapse;
    },
  },
});
</script>
<style scoped lang="scss">
.el-container {
  overflow: scroll;
}
.wrap {
  height: 100%;
}
.sys-containers {
  height: 100%;
}
.sys-aside {
  border-right: 1px solid #dcdfe6;
  position: absolute;
  top: 60px;
  bottom: 60px;
}
.sys-header {
  z-index: 1;
  padding: 0;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
}
</style>
