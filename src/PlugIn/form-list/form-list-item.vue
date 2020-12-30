<template>
  <el-form-item :class="['formList-item',item.class]" :label="item.label" :prop="item.prop" :rules="rules||item.rules" :label-width="item.labelWidth">
    <slot>
      <form-date-picker v-if="datePicker.includes(item.type)" :item="item" :value="value" @change="onChange"/>
      <form-select v-else-if="select.includes(item.type)" :item="item" :value="value" :option="option && option[item.name]" @change="onChange"/>
      <form-input v-else-if="input.includes(item.type)" :item="item" :value="value" :btnList="btnList && btnList[item.name]" @change="onChange" @click="onClick"/>
    </slot>
  </el-form-item>
</template>
<script>
//
import FormDatePicker from './module/form-date-picker.vue'
import FormSelect from './module/form-select.vue'
import FormInput from './module/form-input.vue'

export default {
  name: 'FormListItem',
  components: {FormDatePicker, FormSelect, FormInput},
  props: {item: Object, value: Object, option: [Array, Object], btnList: [Array, Object], rules: Object},
  data: () => ({
    select: ['select', 'selectTree'],
    input: ['text', 'password', 'textarea'],
    datePicker: ['year', 'month', 'date', 'week', 'datetime', 'yearrange', 'monthrange', 'daterange', 'datetimerange']
  }),
  methods: {
    /** 映射 | 回调 - 点击事件
     * @param name
     * @param event
     */
    onClick (name, event) {
      if (name) {
        this.$emit('click', name, event)
      }
    },

    /** 映射 - 内容改变
     * @param data
     */
    onChange (...data) {
      if (this.item.name) {
        this.$emit('change', ...data)
      }
    }
  }
}
</script>
