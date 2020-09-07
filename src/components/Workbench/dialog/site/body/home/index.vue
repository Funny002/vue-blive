<template>
  <div class="site-home">
    <el-divider content-position="left"><h3>{{ $t('home') }}</h3></el-divider>
  </div>
</template>

<script>
export default {
  name: "site-home",
  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: false, name: 'home', lang: 'home'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
</script>

<style lang="less" scoped>
/deep/
.el-divider__text {
  background-color: #f2f2f2;
}
</style>

<i18n src="./lang.json"/>
