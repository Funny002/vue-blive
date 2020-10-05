<template>
  <div class="WorkbenchMenu" :class="{'WorkbenchMenu-editor':isEditor}">
    <div class="WorkbenchMenu-body">
      <router-link class="WorkbenchMenu-logo menu-item" to="/">
        <img :src="logoImage" alt="Logo">
        <span class="menu-item-tooltip" @click.stop>首页</span>
      </router-link>
      <div class="menu-item" @click="MenuListClick">
        <el-avatar icon="el-icon-user-solid" :src="userAvatar" size="small"></el-avatar>
        <span class="menu-item-tooltip" @click.stop>登录/注册</span>
      </div>
      <template v-for="(item,key) in menuList">
        <span v-if="item.type && item.type === 'divider'" class="menu-divider" :key="key"/>
        <div v-else class="menu-item" :key="key" @click="MenuListClick(item)">
          <el-icon class="menu-item-icon" :name="item.icon"/>
          <span class="menu-item-tooltip" @click.stop>{{ item.tooltip }}</span>
        </div>
      </template>
    </div>
    <div class="WorkbenchMenu-cover">
      <el-icon style="transform: rotate(90deg);" name="more"/>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component
export default class WorkbenchMenu extends Vue {
  @Prop({default: false}) isEditor!: boolean;  // 是否编辑状态
  userAvatar = '' // 头像
  logoImage = '' // logo
  menuList = [
    {tooltip: "仪表盘", icon: "discover"},
    {type: "divider"},
    {tooltip: "发布", icon: "video-play"},
    {tooltip: "图库", icon: "picture-outline"},
    {tooltip: "缓存", icon: "time"},
    // {tooltip: "pagination", icon: "copy-document"},
    {tooltip: "模板", icon: "files"},
    {type: "divider"},
    {tooltip: "设置", icon: "setting"},
    {tooltip: "帮助", icon: "question"},
  ]

  MenuListClick(item: any) {
    console.log(item)
  }

  mounted() {
    this.logoImage = require('../../assets/logo.png')
  }
}
</script>
<style scoped lang="scss">
@import "./style.scss";
</style>
