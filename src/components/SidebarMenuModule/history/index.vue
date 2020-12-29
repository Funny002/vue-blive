<template>
  <div class="SidebarMenuModuleHistory" style="display: none">SidebarMenuModuleGallery</div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";

@Component
export default class SidebarMenuModuleHistory extends Vue {
  onInit() {
    this.$message.warning('组件正在施工中......')
  }

  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleHistory', icon: 'history', title: "缓存", sort: 8}
    this.$emit('callBack', data)
  }
}
</script>
