<template>
  <router-view/>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: "App",
  computed: {
    ...mapGetters({
      Lang: "getLang"
    })
  },
  watch: {
    Lang(lang) {
      this.$i18n.locale = lang
    }
  },
  mounted() {
    // 部分引入的组件可能出问题
    // this.$i18n.locale = this.$i18n.locale
  }
}
</script>

<style lang="less">
@import "./assets/less/public.less";
</style>
