<template>
  <div class="site-news">
    <!--    <el-divider content-position="left"><h3>{{ $t('news') }}</h3></el-divider>-->
  </div>
</template>

<script>

export default {
  name: "site-news",
  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: false, name: 'news', title: '首页'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
</script>
