<template>
  <div>workbench-menu-template</div>
</template>

<script>
export default {
  name: "workbench-menu-template",
  mounted() {
    console.log('销毁测试')
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<i18n src="./lang.json"/>
