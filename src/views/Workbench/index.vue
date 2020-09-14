<template>
  <div id="App">
    <workbench-menu ref="workbenchMenu" :show="workbench.menu" @listClick="menuClick"/>
    <div id="container" :class="{'container-editor':workbench.menu}">
      <router-view :menuShow="workbench.menu" @menuShow="menuShow" @openMenu="openMenu"/>
    </div>
    <!-- 菜单的集合 -->
  </div>
</template>

<script>
import WorkbenchMenu from "@/components/Workbench/menu/index";

export default {

  name: "Workbench",
  components: {WorkbenchMenu},
  data: function () {
    return {
      workbench: {
        menu: false
      }
    }
  },
  methods: {
    openMenu(menuName) {
      this.$refs.workbenchMenu.menuListClick(menuName)
    },
    menuShow(show) {
      this.workbench.menu = show
    },
    menuClick(name) {
      console.log('menuClick :>>', name)
    }
  },
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
