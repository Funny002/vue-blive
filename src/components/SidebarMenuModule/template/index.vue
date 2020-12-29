<template>
  <window-dialog classes="SidebarMenuModuleTemplate" :show="dialogShow" title="Blive5模板" @close="onClose">
    SidebarMenuModuleTemplate
  </window-dialog>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";

@Component
export default class SidebarMenuModuleTemplate extends Vue {
  dialogShow = false

  onInit() {
    this.dialogShow = true
    // this.$message.warning('组件正在施工中......')
  }

  onClose() {
    this.dialogShow = false
  }

  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleTemplate', icon: 'th-large', title: "模板", sort: 4}
    this.$emit('callBack', data)
  }
}
</script>
