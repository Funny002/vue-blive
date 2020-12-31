<template>
  <div class="LayoutMain">
    <layout-menu/>
    <layout-container>
      <router-view :key="new Date().getTime()"/>
    </layout-container>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LayoutMenu from './menu.vue'
import LayoutContainer from "@/views/layout/container.vue";

@Component({components: {LayoutMenu, LayoutContainer}})
export default class LayoutMain extends Vue {
}
</script>
<style lang="scss" src="../../assets/style/layout.scss"/>