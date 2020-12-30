<template>
  <el-select
    @change="onChange"
    :remote="item.remote"
    :loading="item.loading"
    :disabled="item.disabled"
    v-model="value[item.name]"
    :filterable="item.filterable"
    :placeholder="item.placeholder"
    popper-class="formList__select"
    :remote-method="item.remoteMethod"
    :filter-method="item.filterMethod"
    :clearable="item.clearable!==false"
  >
    <template v-for="(option,key) in (option || item.option)">
      <el-option :key="key" v-if="!option.children" :label="option[item.optionLabel||'label']" :value="option[item.optionValue||'value']"/>
      <el-option-group :key="key" v-else>
        <el-option class="formList__select-title" :label="option[item.optionLabel||'label']" :value="option[item.optionValue||'value']" :disabled="item.groupTitle"/>
        <el-option v-for="(option_item,key) in option.children" :key="key" :label="option_item[item.optionLabel||'label']" :value="option_item[item.optionValue||'value']"/>
      </el-option-group>
    </template>
  </el-select>
</template>

<script>
const func = () => {
}
export default {
  name: 'FormSelect',
  props: {
    value: Object,
    option: [Array, Object],
    item: {
      remote: Boolean,
      loading: Boolean,
      disabled: Boolean,
      clearable: Boolean,
      groupTitle: Boolean,
      filterable: Boolean,
      optionLabel: String,
      optionValue: String,
      placeholder: String,
      option: [Array, Object],
      filterMethod: {type: Function, default: func},
      remoteMethod: {type: Function, default: func}
    }
  },
  methods: {
    /** 回调 - 内容改变
     * @param value
     */
    onChange (value) {
      if (this.item && this.item.name) {
        this.$emit('change', this.item.name, value)
      }
    }
  }
}
</script>
