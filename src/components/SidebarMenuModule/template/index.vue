<template>
  <div class="SidebarMenuModuleTemplate" style="display: none">SidebarMenuModuleTemplate</div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";

@Component
export default class SidebarMenuModuleTemplate extends Vue {
  onInit() {
    this.$message.warning('组件正在施工中......')
  }

  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleTemplate', icon: 'th-large', title: "模板", sort: 4}
    this.$emit('callBack', data)
  }
}
</script>
