<template>
  <el-dialog
      top="50px"
      :width="width"
      append-to-body
      @close="onClose"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :custom-class="`WindowDialog ${classes}`"
  >
    <div slot="title" class="WindowDialog-title">{{ title }}</div>
    <slot></slot>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator';

@Component
export default class WindowDialog extends Vue {
  @Prop() classes?: string;
  @Prop({default: '80%'}) width?: string;
  @Prop({default: false}) show?: boolean;
  @Prop({default: 'WindowDialog'}) title?: string;

  visible = false

  @Watch('show') getShow(state: boolean) {
    this.visible = state
  }

  onClose() {
    this.$emit('close')
  }
}
</script>
<style scoped lang="scss">
.WindowDialog {
  &-title {
    color: #fff;
    font-weight: 500;
    text-align: center;
  }

  /deep/
  & {
    overflow: hidden;
    height: calc(100vh - 100px);
    border-radius: 8px !important;

    .el-dialog {
      &__header {
        height: 55px;
        box-sizing: border-box;
        background-color: #ff7ab7;

        &btn {
          > i {
            color: #485258;
          }

          &:hover > i {
            color: #ffffff !important;
          }
        }
      }

      &__body {
        padding: 0;
        overflow-y: auto;
        position: relative;
        background-color: #f4f4f4;
        height: calc(100vh - 155px);
      }
    }
  }
}
</style>