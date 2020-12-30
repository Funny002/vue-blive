<template>
  <div :class="['formList__input-btn']" style="margin-left: 10px; display:flex;">
    <template v-for="(btn,key) in btnList">
      <el-button :key="key" :type="btn.type" :icon="btn.icon" :plain="btn.plain||false" :disabled="btn.disabled||false" @click="event=>onClick(btn.name,event)">{{ btn.label }}</el-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FormInputButton',
  props: {btnList: [Array, Object]},
  methods: {
    /** 映射 | 回调 - 点击事件
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
