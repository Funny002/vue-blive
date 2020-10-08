<template>
  <div class="Workbench">
    <el-dialog
        top="50px"
        width="80%"
        append-to-body
        :visible.sync="dialogShow"
        :close-on-click-modal="false"
        custom-class="workbenchDialog"
    >
      <template slot="title">
        <h2>{{ dialogTitle }}</h2>
      </template>
      <component :is="dialogBody" @dialog-close="dialogShow = !dialogShow"/>
    </el-dialog>
    <workbench-menu :is-editor="isEditor"></workbench-menu>
    <router-view @is-editor="event => isEditor = event"/>
  </div>
</template>
<script lang="ts">
import {Getter} from "vuex-class";
import {workbenchDialogState} from "@/store/interface";
import {Component, Vue, Watch} from 'vue-property-decorator'
import WorkbenchMenu from "@/components/WorkbenchMenu/index.vue";

@Component({
  components: {
    WorkbenchMenu
  }
})
export default class Workbench extends Vue {
  dialogShow = false;
  dialogBody = null;
  dialogTitle = '';
  isEditor = false;

  @Getter('WorkbenchDialog/getDialog') dialogInfo?: undefined

  @Watch('dialogInfo') getDialogInfo({title, path}: workbenchDialogState) {
    // 屏蔽传空
    title && path && this.dialogInit(title, path)
  }

  dialogInit(title: string, path: string) {
    // 设置标题
    this.dialogTitle = title;
    // 开启窗口
    this.dialogShow = true;
    // 载入页面
    this.dialogBody = () => import(/* webpackChunkName: "WorkbenchDialog" */  `@/components/WorkbenchDialog/${path}/index.vue`);
  }
}
</script>
<style lang="scss">
.workbenchDialog {
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  flex-direction: column;
  height: calc(100vh - 100px);

  .el-dialog {
    &__headerbtn {
      position: initial;

      > i,
      &:hover > i {
        color: #fff;
      }
    }

    &__header {
      height: 60px;
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      background-color: #FF86B2;

      > h2 {
        margin: 0 auto;
        color: #fff !important;
      }
    }

    &__body {
      padding: 0;
      width: 100%;
      flex: 1 1 auto;
      height: calc(100% - 60px);
    }
  }
}
</style>
