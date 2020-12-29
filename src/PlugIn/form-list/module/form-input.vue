<template>
  <!-- 存在 && 是数组 && 大于0 -->
  <div :class="['formList__input']" v-if="item.btnList&&Array.isArray(item.btnList)&&item.btnList.length" style="display: flex;">
    <form-input-item :value="value" :item="item" @click="onClick" @change="onChange"/>
    <form-input-button :btn-list="(btnList || item.btnList)" @click="onClick"/>
  </div>
  <form-input-item v-else :value="value" :item="item" @click="onClick" @change="onChange"/>
</template>

<script>
import FormInputItem from './form-input-item.vue'
import FormInputButton from './form-input-button'

export default {
  name: 'FormInput',
  components: {FormInputButton, FormInputItem},
  props: {item: Object, value: Object, btnList: [Array, Object]},
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
     * @param name
     * @param value
     */
    onChange (name, value) {
      if (this.item && this.item.name) {
        this.$emit('change', name, value)
      }
    }
  }
}
</script>
