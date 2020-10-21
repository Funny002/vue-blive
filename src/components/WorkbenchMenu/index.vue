<template>
  <div class="WorkbenchMenu" :class="{'WorkbenchMenu-editor':isEditor}">
    <div class="WorkbenchMenu-body">

      <div class="menu-item" @click="$emit('login-click')">
        <el-avatar icon="el-icon-user-solid" :src="userAvatar" size="small"></el-avatar>
        <span class="menu-item-tooltip" @click.stop>登录/注册</span>
      </div>

      <div v-if="isEditor" class="menu-item" @click="$router.push({path:'/workbench/index'})">
        <el-icon class="menu-item-icon" name="back"/>
        <span class="menu-item-tooltip" @click.stop>回退</span>
      </div>
      <div v-else class="menu-item" @click="$router.push({path:'/'})">
        <el-icon class="menu-item-icon" name="guide"/>
        <span class="menu-item-tooltip" @click.stop>首页</span>
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
  menuList: { [key: string]: string }[] = [
    // {tooltip: "仪表盘", path: '/dashboard', icon: "discover"},
    {type: "divider"},
    {tooltip: "发布", path: 'release', icon: "video-play"},
    {tooltip: "图库", path: 'gallery', icon: "picture-outline"},
    {tooltip: "缓存", path: 'history', icon: "time"},
    // {tooltip: "分页", path: 'pagination', icon: "copy-document"},
    {tooltip: "模板", path: 'template', icon: "files"},
    {type: "divider"},
    {tooltip: "设置", path: 'site', icon: "setting"},
    {tooltip: "帮助", path: 'help', icon: "question"},
  ]

  MenuListClick({path, tooltip}: { [key: string]: string }) {
    if (['sign', 'release', 'gallery', 'help'].includes(path)) {
      return this.$message({
        message: ` ${tooltip}，功能正在施工中......`,
        type: 'warning'
      });
    }
    if (path.indexOf('/') >= 0) {
      this.$router.push({path})
    } else {
      this.$store.commit('WorkbenchDialog/setPath', path)
    }
  }

  mounted() {
    this.logoImage = require('../../assets/logo.png')
  }
}
</script>
<style scoped lang="scss">
@import "./style.scss";
</style>
