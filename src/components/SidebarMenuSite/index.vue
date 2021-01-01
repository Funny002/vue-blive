<template>
  <div class="SidebarMenuSite">SidebarMenuSite</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {SiteMenuItem} from "@/components/SidebarMenuModule/site/verifyRules";

@Component
export default class SidebarMenuSite extends Vue {

  created() {
    // 自动挂载菜单回调
    const data: SiteMenuItem[] = [
      {icon: 'home', label: "首页", sort: 100},
      {type: "button", name: 'SidebarMenuSite', icon: 'home', label: "首页", sort: 100},
    ]
    this.$emit('callBack', data)
  }
}
</script>