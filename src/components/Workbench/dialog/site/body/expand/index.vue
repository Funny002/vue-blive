<template>
  <div class="site-expand">
    <el-divider content-position="left"><h3>{{ $t('expand') }}</h3></el-divider>

    <div class="card-block">
      <h3>{{ $t('ruler') }}</h3>
      <el-switch :value="getRulerShow" @change="rulerChange"/>
    </div>

    <div class="card-block">
      <h3>{{ $t('backdrop') }}</h3>
      <el-switch v-model="backdrop"/>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "site-expand",
  data: function () {
    return {
      ruler: false,
      backdrop: true
    }
  },
  computed: {
    ...mapGetters('Ruler', {
      'getRulerShow': "getShow",
    })
  },
  methods: {
    rulerChange(status) {
      this.$store.commit('Ruler/setShow', status)
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
