<template>
  <div class="site-expand">
    <el-divider content-position="left"><h3>工作台</h3></el-divider>

    <div class="var-cord">
      <h3>标尺</h3>
      <el-switch :value="getRulerShow" @change="rulerChange"/>
    </div>


    <!--    <div class="card-block">-->
    <!--      <h3>{{ $t('backdrop') }}</h3>-->
    <!--      <el-switch v-model="backdrop" disabled/>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import {Getter} from "vuex-class";
import {Component, Vue} from "vue-property-decorator";

@Component
export default class SiteExpand extends Vue {
  @Getter('Expand/getRuler') getRulerShow?: boolean

  rulerChange(status: boolean) {
    this.$store.dispatch('Expand/save', {type: 'setRuler', value: status})
  }


  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: false, name: 'expand', title: '工作台'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
// import {mapGetters} from 'vuex'
//
// export default {
//   name: "site-expand",
//   data: function () {
//     return {
//       ruler: false,
//       backdrop: false
//     }
//   },
//   computed: {
//     ...mapGetters('Ruler', {
//       'getRulerShow': "getShow",
//     })
//   },
//   methods: {
//     rulerChange(status) {
//       this.$store.commit('Ruler/setShow', status)
//     }
//   },
//   mounted() {
//     this.$nextTick(() => {
//       const menuData = [
//         {isMenu: false, name: 'expand', lang: 'expand'},
//       ]
//       this.$emit('menuCallback', menuData)
//     })
//   }
// }
</script>
