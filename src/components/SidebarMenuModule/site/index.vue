<template>
  <div class="SidebarMenuModuleSite" style="display: none">SidebarMenuModuleSite</div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";

@Component
export default class SidebarMenuModuleSite extends Vue {
  onInit() {
    this.$message.warning('组件正在施工中......')
  }

  created() {
    const data: MenuItem[] = [
      {type: "line", sort: 3},
      {name: 'SidebarMenuModuleSite', icon: 'cogs', title: "设置", sort: 2}
    ]
    this.$emit('callBack', data)
  }
}
</script>
