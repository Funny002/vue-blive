<template>
  <div class="workbench-menu" :class="{'workbench-menu-block': !show}">
    <div class="menu" :class="{'menu-normal':show}">
      <el-tooltip placement="right" content="Logo">
        <div class="menu-logo" v-show="show">
          <img :src="menu.logo" alt="Logo">
        </div>
      </el-tooltip>
      <el-tooltip placement="right" :content="$t('user')">
        <div class="menu-avatar" @click="menuListClick('user')">
          <el-avatar v-if="!user.login" icon="el-icon-user-solid" alt="Avatar" size="small"/>
          <el-avatar v-else size="small" :src="user.avatar" :alt="user.name"/>
        </div>
      </el-tooltip>
      <el-tooltip
          class="menu-list"
          placement="right"
          :content="$t(item.name)"
          :disabled="item.disabled"
          v-for="(item,key) in menu.list" :key="key"
      >
        <el-divider v-if="item.type==='line'"/>
        <el-button v-else-if="item.type==='btn'" type="text" @click="menuListClick(item.name)">
          <el-icon :name="item.icon"/>
        </el-button>
      </el-tooltip>
    </div>
    <div class="menu-divider">
      <el-icon class="menu-divider-icon" name="more"/>
    </div>
    <dialog-series ref="dialogSeries"/>
  </div>
</template>

<script>
import dialogSeries from '../dialog/index.vue'

export default {
  name: "workbench-menu",
  props: {show: Boolean},
  components: {'dialog-series': dialogSeries},
  data: function () {
    return {
      menu: {
        logo: './logo.png',
        list: [
          {disabled: false, type: "btn", name: "dashboard", icon: "discover"},
          {disabled: true, type: "line"},
          {disabled: false, type: "btn", name: "release", icon: "video-play"},
          {disabled: false, type: "btn", name: "gallery", icon: "picture-outline"},
          {disabled: false, type: "btn", name: "history", icon: "time"},
          {disabled: false, type: "btn", name: "pagination", icon: "copy-document"},
          {disabled: false, type: "btn", name: "template", icon: "files"},
          {disabled: true, type: "line"},
          {disabled: false, type: "btn", name: "site", icon: "setting"},
          {disabled: false, type: "btn", name: "help", icon: "question"},
        ],
      },
      user: {
        name: "",
        avatar: "",
        login: false,
      }
      //
    }
  },
  methods: {
    menuListClick(name) {
      if (['dashboard', 'user', 'release', 'gallery', 'history', 'pagination', 'help'].includes(name)) {
        // 跳转到仪表盘
        // name === 'dashboard' && this.$router.push({path: "/dashboard"})
        this.$message({
          message: `${this.$t(name)},功能正在施工中......`,
          type: 'warning'
        });
        this.$confirm
      } else {
        this.$refs.dialogSeries.init(name)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<i18n src="./lang.json"/>
