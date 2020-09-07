<template>
  <div class="site-view">
    <el-divider content-position="left"><h3>{{ $t('view') }}</h3></el-divider>

    <div class="card-block card-transition" style="flex-direction: column;">
      <div class="card-block" style="padding: 0;">
        <h3>{{ $t('view') }}</h3>
        <el-switch v-model="view"/>
      </div>
      <el-collapse-transition>
        <div v-show="view">
          <el-divider/>
          <div class="card-block">
            <h3>{{ $t('themeColor') }}</h3>
            <el-radio-group v-model="themeColor">
              <el-radio label="light">vs-light</el-radio>
              <el-radio label="dark">vs-dark</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-collapse-transition>
    </div>

  </div>
</template>

<script>

export default {
  name: "site-view",
  data: function () {
    return {
      view: true,
      themeColor: 'light',
    }
  },
  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: false, name: 'view', lang: 'view'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
</script>

<i18n src="./lang.json"/>
