<template>
  <window-dialog classes="MenuSite" :show="dialogShow" title="设置" @close="onClose">
    <div class="MenuSite__menu">

      <template v-for="(item,key) in siteMenu">
        <div
            :key="key"
            class="MenuSite__menu-item"
            :class="{'MenuSite__menu-btn':item.type==='button','MenuSite__menu-active':activeKeys===item.name}"
            @click="onClick(item,item.type==='button')"
        >
          <fa-icon class="MenuSite__menu-item-icon" :name="item.icon"/>
          <div class="MenuSite__menu-item-text">{{ item.label }}</div>
        </div>
      </template>

    </div>
    <!-- 自动挂载模块? -->
    <div class="MenuSite__modules" ref="modules">
      <template v-for="(item,key) in modulesList">
        <component :key="key" :ref="item.name" :is="item.modules" @callBack="onCallBack"/>
      </template>
    </div>
  </window-dialog>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem, MenuList} from "@/components/SidebarMenu/verifyRules";
import {SiteMenuItem} from './verifyRules'

@Component
export default class SidebarMenuModuleSite extends Vue {
  dialogShow = false
  activeKeys = ''
  modulesList: MenuList[] = [];
  siteMenu: SiteMenuItem[] = [];

  onInit() {
    this.dialogShow = true
  }

  onClose() {
    this.dialogShow = false
  }

  onClick(item: SiteMenuItem, state: boolean) {
    if (state) {
      // 选中设置
      // this.$refs.modules.scrollTop = ??
      this.activeKeys = this.activeKeys === item.name ? '' : item.name
    }
  }

  // 自动挂载回调
  onCallBack(item: MenuItem | MenuItem[]) {
    const itemVerify = (data: MenuItem) => {
      if (data.sort === undefined) data.sort = 0
      this.siteMenu.push(data)
    }
    // 添加到列表
    if (Array.isArray(item)) {
      item.map(itemVerify)
    } else {
      itemVerify(item)
    }
    this.$utils.threadTimeout.ThreadTimer(() => {
      this.siteMenu.length > 1 && this.siteMenu.sort((a: MenuItem, b: MenuItem) => (b.sort - a.sort))
    })
  }

  /* 自动挂载 ../../SidebarMenuSite/ 路径必须存在 */
  authMount(mountList: MenuList[] = []): MenuList[] {
    const requireComponent = require.context('../../SidebarMenuSite/', true, /^.\/[\w]+(\/index)?.vue$/);
    requireComponent.keys().forEach((path: string) => {
      const context = requireComponent(path);
      const name = context.default.name || context.name;
      console.log('sidebarMenuSite -> authMount :>> name', name)
      mountList.push({name, modules: context.default || context});
    });
    return mountList
  }

  created() {
    // 自动挂载菜单回调
    const data: MenuItem[] = [
      {type: "line", sort: 3},
      {name: 'SidebarMenuModuleSite', icon: 'cogs', title: "设置", sort: 2}
    ]
    this.$emit('callBack', data)
    // 加载设置的自动挂载
    this.modulesList = this.authMount()
  }
}
</script>

<style lang="scss" src="./site.scss"/>