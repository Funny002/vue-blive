<template>
  <div>
    <div class="sidebarMenu" :class="{'sidebarMenu-hide':isHide}">
      <div class="sidebarMenu-body">

        <div class="sidebarMenu-item" @click="onMenuItemClick({name:'SidebarMenuLogin'})">
          <fa-icon class="sidebarMenu-item-icon" name="user-circle-o"/>
          <div class="sidebarMenu-item-tips">登录/注册</div>
        </div>

        <div class="sidebarMenu-item" @click="$router.push({path:'/'})">
          <fa-icon class="sidebarMenu-item-icon" name="home"/>
          <div class="sidebarMenu-item-tips">首页</div>
        </div>
        <div v-if="isHide" class="sidebarMenu-item" @click="$router.go(-1)">
          <fa-icon class="sidebarMenu-item-icon" name="reply"/>
          <div class="sidebarMenu-item-tips">返回</div>
        </div>

        <div class="sidebarMenu-line"/>
        <!-- 内容层 -->
        <template v-for="(item,key) in sidebarMenu">
          <div :key="key" v-if="item.type==='line'" class="sidebarMenu-line"/>
          <div :key="key" v-else class="sidebarMenu-item" @click="onMenuItemClick(item)">
            <fa-icon class="sidebarMenu-item-icon" :name="item.icon"/>
            <div v-if="item.title" class="sidebarMenu-item-tips">{{ item.title }}</div>
          </div>
        </template>
      </div>
    </div>
    <!-- 菜单模组 -->
    <template v-for="(item,key) in modulesList">
      <component :key="key" :ref="item.name" :is="item.modules" @callBack="onCallBack"/>
    </template>
  </div>
</template>

<!-- script -->
<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator';
import {MenuItem, MenuList} from './verifyRules';
import {Getter} from "vuex-class";

@Component
export default class SidebarMenu extends Vue {
  @Prop({default: false}) isHide?: boolean; // 是否隐藏
  sidebarMenu: MenuItem[] = [];
  modulesList: MenuList[] = [];
  // 监听 vuex
  @Getter('SidebarMenu/getOpenName') getOpenName?: string;

  // 监听变量改变
  @Watch('getOpenName') getGetOpenName(value: string | undefined) {
    if (!value) return false
    // 过滤
    for (const item of this.sidebarMenu) {
      item.name === value && this.onMenuItemClick(item)
    }
    // 窗口不存在
    console.warn('%s ,Windows don\'t exist', value)
  }

  onCallBack(item: MenuItem | MenuItem[]) {
    const itemVerify = (data: MenuItem) => {
      if (data.sort === undefined) data.sort = 0
      this.sidebarMenu.push(data)
    }
    // 添加到列表
    if (Array.isArray(item)) {
      item.map(itemVerify)
    } else {
      itemVerify(item)
    }
    this.$utils.threadTimeout.ThreadTimer(() => {
      this.sidebarMenu.length > 1 && this.sidebarMenu.sort((a: MenuItem, b: MenuItem) => (b.sort - a.sort))
    })
  }

  onMenuItemClick({name}: MenuItem) {
    try {
      const dom = this.$refs[name][0]
      try {
        dom.$nextTick(() => dom.onInit())
      } catch (e) {
        console.warn(`"${name}"组件缺少"onInit"方法! Error: e`, e)
      }
    } catch (e) {
      console.warn(`${name}：ref not exist`, e)
    }
  }

  /* 自动挂载 ../SidebarMenuModule 路径必须存在 */
  authMount(mountList: MenuList[] = []): MenuList[] {
    const requireComponent = require.context('../SidebarMenuModule', true, /^.\/[\w]+(\/index)?.vue$/);
    requireComponent.keys().forEach((path: string) => {
      const context = requireComponent(path);
      const name = context.default.name || context.name;
      mountList.push({name, modules: context.default || context});
    });
    return mountList
  }

  created() {
    this.modulesList = this.authMount()
  }
}
</script>

<!-- style -->
<style lang="scss" src="../../assets/style/SidebarMenu/index.scss"/>