<template>
  <div class="WorkbenchEditor"></div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class WorkbenchEditor extends Vue {
  mounted() {
    this.$emit('is-editor', true)
  }
}
</script>
<style scoped lang="scss">
//
</style>
