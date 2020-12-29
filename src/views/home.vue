<template>
  <div class="home">
    <!-- 组件 -->
    <sidebar-menu :is-hide="isHide"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SidebarMenu from "@/components/SidebarMenu/SidebarMenu.vue";

@Component({components: {SidebarMenu}})
export default class Home extends Vue {
  isHide = false
  //
}
</script>
