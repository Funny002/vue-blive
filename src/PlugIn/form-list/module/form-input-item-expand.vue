<template>
  <span @click="event=>onClick(item.name, event)">
    <template v-if="item.type==='text'">{{ item.label }}</template>
    <i v-else-if="item.type==='icon'" :class="item.label"></i>
  </span>
</template>
<script>
export default {
  name: 'FormInputItemExpand',
  props: {
    item: {
      label: String
    }
  },
  methods: {
    onClick (name, event) {
      if (name) {
        this.$emit('click', name, event)
      }
    }
  }
}
</script>
