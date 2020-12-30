<template>
  <el-row :class="['formList', rowClass]" :gutter="gutter">
    <el-form
      :size="size"
      ref="FormList"
      :inline="inline"
      :rules="formRules"
      :disabled="disabled"
      :model.sync="formValue"
      :label-width="labelWidth"
      :status-icon="statusIcon"
      :class="['formList-form',formClass]"
      :hide-required-asterisk="hideRequiredAsterisk"
    >
      <el-col v-for="(item,key) in formList" :key="key" :span="item.span||24" v-show="item.show!==undefined?item.show:true">
        <slot v-if="item.slot" :name="item.slot" :item="item"/>
        <form-list-item v-else :value="formValue" :item="item" :btn-list="btnList" :option="option" @change="onChange" @click="onClick"/>
      </el-col>
    </el-form>
  </el-row>
</template>
<script>
import FormListItem from './form-list-item.vue'

export default {
  name: 'FormList',
  props: {
    rowClass: String,
    formClass: String,
    gutter: {type: Number, default: 0},
    //
    inline: Boolean,
    disabled: Boolean,
    statusIcon: Boolean,
    hideRequiredAsterisk: Boolean,
    size: {type: String, default: 'mini'},
    labelWidth: {type: String, default: '80px'},
    //
    formValue: Object,
    formRules: Object,
    formList: [Array, Object],
    //
    option: Object,
    btnList: Object
  },
  components: {FormListItem},
  data: () => ({formListDom: null}),
  methods: {
    /** 回调 - 点击事件
     * @param name
     * @param event
     */
    onClick (name, event) {
      if (name) {
        this.$emit(`${name}-click`, event)
      }
    },
    /** 映射 - 内容改变
     * @param data
     */
    onChange (...data) {
      this.$emit('change', ...data)
    },
    /** 获取表单dom
     */
    getDom () {
      if (!this.formListDom) {
        this.formListDom = this.$refs.FormList
      }
      return this.formListDom
    },
    /** 方法映射 - 表单重置
     */
    resetFields () {
      this.getDom().resetFields()
    },
    /** 方法映射 - 移除表单验证
     * @param props
     */
    clearValidate (props = undefined) {
      this.getDom().clearValidate(props)
    },
    /**  方法映射 - 表单校验
     * @param func
     */
    validate (func) {
      this.getDom().validate(event => func(event))
    }
  }
}
</script>
<style scoped lang="scss">
.formList {
  width: 100%;

  /deep/
  .el-form-item {
    display: flex;

    &__content {
      width: 100%;
      display: flex;
      margin-left: inherit !important;

      > div {
        width: 100%;
        display: block;
      }

      > .el-date-editor {
        display: inline-flex;
      }
    }
  }
}
</style>
<style lang="scss">
.formList__select {
  &-title {
    padding-left: 20px !important;

    &.is-disabled {
      cursor: default;
      font-weight: 500;
      color: #000 !important;
    }
  }

  /deep/
  .el-select-group {
    //el-select-group__wrap
    .el-select-dropdown__item {
      padding-left: 30px;
    }

    &__title {
      color: #000;
      font-weight: 500;
    }

    &__wrap {
      padding-bottom: 0 !important;

      &::after {
        display: none;
      }
    }
  }
}
</style>

