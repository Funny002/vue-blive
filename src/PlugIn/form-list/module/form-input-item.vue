<template>
  <el-input
    :type="item.type"
    @change="onChange"
    :maxlength="item.max"
    :readonly="item.readonly"
    :disabled="item.disabled"
    v-model="value[item.name]"
    :suffix-icon="item.suffixIcon"
    :prefix-icon="item.prefixIcon"
    :placeholder="item.placeholder"
    :clearable="item.clearable!==false"
    :show-word-limit="item['showWord']"
  >
    <form-input-item-expand v-if="item.prepend" slot="prepend" :item="item.prepend" @click="onClick"/>
    <form-input-item-expand v-if="item.append" slot="append" :item="item.append" @click="onClick"/>
  </el-input>
</template>
<script>
import FormInputItemExpand from './form-input-item-expand.vue'

export default {
  name: 'FormInputItem',
  components: {FormInputItemExpand},
  props: {
    value: Object,
    item: {
      max: Number,
      name: String,
      append: Object,
      prepend: Object,
      showWord: Number,
      readonly: Boolean,
      suffixIcon: String,
      prefixIcon: String,
      placeholder: String
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
    },
    /** 映射 - 回调点击
     * @param name
     * @param event
     */
    onClick (name, event) {
      if (name) {
        this.$emit('click', name, event)
      }
    }
  }
}
</script>
