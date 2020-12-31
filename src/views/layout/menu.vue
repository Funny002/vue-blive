<template>
  <div class="LayoutMenu">
    <div class="LayoutMenu__logo">
      <img :src="logo" alt="logo"/>
    </div>

    <div class="LayoutMenu__body">
      <el-menu mode="horizontal" :default-active="$route.path" router>
        <template v-for="(item,key) in navMenu">
          <!--        <div class="" :key="key" @click="routeJump(item.route)">{{ item.label }}</div>-->
<!--          <div class="" :key="key" route>{{ item.label }}</div>-->
          <el-menu-item :key="key" :index="item.route" :route="item.route">{{ item.label }}</el-menu-item>
        </template>
      </el-menu>
    </div>

    <span style="margin: 0 auto"/>
    <div class="LayoutMenu__nav">
      <div class="Layout__btn" v-for="(item,key) in iconLIst" :key="key">
        <fa-icon :name="item.icon"></fa-icon>
      </div>
    </div>
    <div v-if="userInfo" class="LayoutMenu__user">
      <div class="LayoutMenu__user_avatar">
        <img :src="userInfo.avatar" alt="avatar"/>
      </div>
      <span class="LayoutMenu__user_name">{{ userInfo.name }}</span>
    </div>
    <div v-else class="LayoutMenu__user">
      <div class="LayoutMenu__user_icon">
        <fa-icon name="user-circle-o"></fa-icon>
      </div>
      <span class="LayoutMenu__user_name">登录/注册</span>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class LayoutMenu extends Vue {
  navMenu = [
    {route: "/index", label: "首页"},
    {route: "/project", label: "项目"},
    {route: "/workbench", label: "工作台"},
  ]
  iconLIst = [
    {icon: 'bell-o ', name: '通知'},
    {icon: 'question-circle-o', name: '帮助'}
  ]
  userInfo = false
  logo = require('@/assets/image/logo.png')
}
</script>
