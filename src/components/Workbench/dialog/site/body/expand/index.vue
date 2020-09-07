<template>
  <div class="site-expand">
    <el-divider content-position="left"><h3>{{ $t('expand') }}</h3></el-divider>

    <div class="card-block">
      <h3>{{ $t('ruler') }}</h3>
      <el-switch v-model="ruler"/>
    </div>

    <div class="card-block">
      <h3>{{ $t('backdrop') }}</h3>
      <el-switch v-model="backdrop"/>
    </div>

  </div>
</template>

<script>

export default {
  name: "site-expand",
  data: function () {
    return {
      ruler: true,
      backdrop: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: false, name: 'expand', lang: 'expand'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
</script>

<i18n src="./lang.json"/>
