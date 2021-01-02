<template>
  <div class="WorkbenchMain">
    <sidebar-menu :is-hide="$route.name ==='workbenchEditor'"></sidebar-menu>
    <div class="WorkbenchMainContainer">
      <router-view :key="new Date().getTime()"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import SidebarMenu from "@/components/SidebarMenu/SidebarMenu.vue";


@Component({components: {SidebarMenu}})
export default class WorkbenchMain extends Vue {
  //
}
</script>

<style lang="scss" src="./workbench.scss"/>