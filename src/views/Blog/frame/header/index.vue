<template>
  <header class="blog-header">
    <div class="var-header">
      <router-link class="header-logo" to="/">
        <img :src="logoImage" alt="logo"/>
      </router-link>
      <el-menu mode="horizontal" active-text-color="#FF86B2" :default-active="active" router>
        <el-menu-item v-for="(item,key) in menuList" :key="key" :index="item.path">{{ item.label }}</el-menu-item>
      </el-menu>
      <span style="margin: 0 auto;"/>
      <div class="header-search">
        <el-input v-model="search" clearable/>
        <el-button icon="el-icon-search" @click="searchClick"></el-button>
      </div>
      <div class="header-sign">
        <div class="header-sign-image" :style="{'background-image': `url('${userAvatar}')`}">
          <span :class="['header-sign-online',`online-${isOnline ? 'success' : 'error'}`]"></span>
        </div>
        <el-dropdown v-if="isOnline">
          <span>{{ userName }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-else>
          <el-button type="text"><span style="padding: 0 16px;">登录/注册</span></el-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class BlogHeader extends Vue {
  search = ''
  logoImage = ''
  userAvatar = ''
  isOnline = false;
  userName = 'Re Funny'
  menuList = [
    {path: "/index", label: "首页"},
    {path: "/project", label: "项目"},
    {path: "/donate", label: "捐赠"},
    {path: "/about", label: "关于"},
    {path: "/workbench", label: "工作台"}
  ]

  get active() {
    return this.$route.path
  }

  searchClick() {
    console.log('searchClick')
  }

  mounted() {
    this.logoImage = require('../../../../assets/logo.png')
    console.log('mounted')
  }
}
</script>

<style scoped lang="scss">
.blog-header {
  width: 100%;
  height: 60px;
  background-color: #FFFFFF;
}

.header-logo {
  height: 40px;
  margin-right: 32px;

  > img {
    display: block;
    max-height: 100%;
  }
}

.header-sign {
  display: flex;
  margin-left: 16px;
  align-items: center;

  &-image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-size: 100%;
    background-color: #eee;
    box-shadow: 0 0 3px #bbb;
    background-repeat: no-repeat;
    background-position: center center;
  }

  &-online {
    right: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    display: block;
    position: absolute;
    border-radius: 50%;
  }
}

.header-search {
  display: flex;
  align-items: center;

  > div:hover {
    z-index: 10;
  }

  /deep/
  .el {
    &-button {
      margin-left: -1px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}

.online {
  &-error {
    background-color: #bbb;
  }

  &-success {
    background-color: #59f;
  }
}

.var-header {
  width: 100%;
  height: 60px;
  display: flex;
  margin: 0 auto;
  padding: 0 16px;
  max-width: 1420px;
  align-items: center;
}
</style>
