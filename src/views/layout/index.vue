<template>
  <div class="LayoutMain">
    <layout-menu/>
    <layout-container>
      <router-view :key="new Date().getTime()"/>
    </layout-container>
  </div>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";
import LayoutContainer from "./container.vue";
import LayoutMenu from './menu.vue'

@Component({components: {LayoutMenu, LayoutContainer}})
export default class Layout extends Vue {}
</script>
<style lang="scss" src="../../assets/style/layout.scss"/>