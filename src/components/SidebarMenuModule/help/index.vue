<template>
  <div class="SidebarMenuModuleHelp" style="display: none">SidebarMenuModuleHelp</div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";

@Component
export default class SidebarMenuModuleHelp extends Vue {
  onInit() {
    this.$message.warning('组件正在施工中......')
  }

  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleHelp', icon: 'question-circle-o', title: "帮助", sort: 1}
    this.$emit('callBack', data)
  }
}
</script>
