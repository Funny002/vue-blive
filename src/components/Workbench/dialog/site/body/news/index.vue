<template>
  <div class="site-news">
    <el-divider content-position="left"><h3>{{ $t('news') }}</h3></el-divider>
  </div>
</template>

<script>

export default {
  name: "site-news",
  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: false, name: 'news', lang: 'news'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
</script>

<i18n src="./lang.json"/>
