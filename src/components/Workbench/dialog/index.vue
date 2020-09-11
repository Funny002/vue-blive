<template>
  <el-dialog
      top="50px"
      width="80%"
      append-to-body
      :visible.sync="show"
      :close-on-click-modal="false"
      custom-class="workbench-dialog"
  >
    <template slot="title">
      <h2 class="workbench-dialog-title">{{ $t(dialogName) }}</h2>
    </template>
    <component :is="component" @dialogClose="show = !show"/>
  </el-dialog>
</template>

<script>

export default {
  name: "workbench-dialog",
  data: function () {
    return {
      show: false,
      dialogName: "",
      dialogHeight: 0,
      component: null,
    }
  },
  methods: {
    init(dialogName) {
      this.show = !this.show
      if (this.dialogName !== dialogName) {
        this.dialogName = dialogName
        this.component = () => import(/* webpackChunkName: "Workbench" */  `./${dialogName}/index.vue`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<i18n src="./lang.json"/>
