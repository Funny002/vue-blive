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
  }
}
</script>

<style lang="less">
@import "./assets/less/public.less";
</style>
