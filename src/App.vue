<template>
  <router-view v-if="containerShow" :key="new Date().getTime()"/>
</template>
<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";

@Component
export default class App extends Vue {
  containerShow = true

  @Watch('$route.path', {deep: true, immediate: true}) get$route() {
    this.containerShow = false
    this.$nextTick(() => {
      this.containerShow = true
    })
  }
}
</script>

<style lang="scss" src="./assets/style/public.scss"/>