<template>
  <div class="site-home">
    <!--    <el-divider content-position="left"><h3>{{ $t('home') }}</h3></el-divider>-->
  </div>
</template>

<script>
export default {
  name: "site-home",
  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: false, name: 'home', title: '首页'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
</script>
