<template>
  <div class="SidebarMenuModuleRelease" style="display: none">SidebarMenuModuleRelease</div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";

@Component
export default class SidebarMenuModuleRelease extends Vue {
  onInit() {
    this.$message.warning('组件正在施工中......')
  }

  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleRelease', icon: 'paper-plane-o', title: "发布", sort: 10}
    this.$emit('callBack', data)
  }
}
</script>
