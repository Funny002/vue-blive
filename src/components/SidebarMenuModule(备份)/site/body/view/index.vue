<!--<template>-->
<!--  <div class="site-view">-->
<!--    <el-divider content-position="left"><h3>代码视图</h3></el-divider>-->

<!--    <div class="var-cord" style="flex-direction: column;">-->
<!--      <div class="var-cord">-->
<!--        <h3>代码视图</h3>-->
<!--        <el-switch v-model="isShow"/>-->
<!--      </div>-->
<!--      <el-collapse-transition>-->
<!--        <div v-show="isShow" style="width: 100%;">-->
<!--          <el-divider/>-->
<!--          <div class="var-cord">-->
<!--            <h3>编辑器颜色</h3>-->
<!--            <el-radio-group v-model="VsCodeTheme">-->
<!--              <el-radio label="light">vs-light</el-radio>-->
<!--              <el-radio label="dark">vs-dark</el-radio>-->
<!--            </el-radio-group>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-collapse-transition>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import {Component, Vue} from "vue-property-decorator";-->

<!--@Component-->
<!--export default class SiteView extends Vue {-->
<!--  isShow = false-->
<!--  VsCodeTheme = false-->

<!--  mounted() {-->
<!--    this.$nextTick(() => {-->
<!--      const menuData = [-->
<!--        {isMenu: false, title: '代码视图', name: 'view'},-->
<!--      ]-->
<!--      this.$emit('menuCallback', menuData)-->
<!--    })-->
<!--  }-->
<!--}-->
<!--//export default {-->
<!--//  name: "site-view",-->
<!--//  data: function () {-->
<!--//    return {-->
<!--//      view: true,-->
<!--//      themeColor: 'light',-->
<!--//    }-->
<!--//  },-->
<!--//  mounted() {-->
<!--//    this.$nextTick(() => {-->
<!--//      const menuData = [-->
<!--//        {isMenu: false, title: '代码视图', name: 'view'},-->
<!--//      ]-->
<!--//      this.$emit('menuCallback', menuData)-->
<!--//    })-->
<!--//  }-->
<!--//}-->
<!--</script>-->
