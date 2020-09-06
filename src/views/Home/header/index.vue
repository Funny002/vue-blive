<template>
  <div class="header">
    <router-link class="logo noneBefore" to="/">
      <img src="../../../assets/logo.png" alt="logo"/>
    </router-link>
    <el-menu mode="horizontal" active-text-color="#FF86B2" :default-active="active" router>
      <el-menu-item v-for="(item,key) in menuList" :key="key" :index="item.path">{{ $t(item.lang) }}</el-menu-item>
    </el-menu>
    <span style="margin: 0 auto;"></span>
    <div id="search">
      <el-input clearable :placeholder="$t('search')">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <lang-module/>
  </div>
</template>

<script>
import LangModule from "@/components/Lang/index";

export default {
  name: "header",
  components: {LangModule},
  data: function () {
    return {
      menuList: [
        {path: "/index", lang: "home"},
        {path: "/about", lang: "me"},
        {path: "/project", lang: "project"},
        {path: "/donate", lang: "donate"},
      ]
    }
  },
  computed: {
    active() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less">
@import "./index.less";
</style>

<i18n src="./lang.json"/>
