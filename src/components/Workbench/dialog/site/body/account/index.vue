<template>
  <div class="site-account">
    <el-divider content-position="left"><h3>{{ $t('account') }}</h3></el-divider>
  </div>
</template>

<script>

export default {
  name: "site-account",
  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: true, lang: 'filter'},
        {isMenu: false, name: 'account', lang: 'account'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
</script>

<i18n src="./lang.json"/>
