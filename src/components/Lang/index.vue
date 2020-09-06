<template>
  <el-dropdown trigger="click" @command="switchCommand" @visible-change="langMenuShow">
    <el-button type="text">
      <div class="var-lang">
        <span>{{ $t('lang') }}</span>
        <div class="var-lang-icon" :class="{'var-langMenu-block':lang.menuShow}">
          <el-icon class="var-lang-icon-list" name="arrow-up"></el-icon>
          <el-icon class="var-lang-icon-list" name="arrow-down"></el-icon>
        </div>
      </div>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in lang.list" :key="item.value" :command="item.value" v-t="item.label"/>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<i18n src="./lang.json"/>
<script>
export default {
  name: "lang-module",
  data: function () {
    return {
      lang: {
        menuShow: false,
        list: [
          {label: '简体中文', value: 'zh'},
          {label: 'English', value: 'en'},
        ]
      }
    }
  },
  methods: {
    langMenuShow(show) {
      this.lang.menuShow = show
    },
    switchCommand(lang) {
      this.$store.commit('setLang', lang)
    }
  }
}
</script>
<style lang="less" scoped>
.var-lang {
  height: 20px;
  display: flex;
  overflow: hidden;
  position: relative;
  padding-left: 16px;
  align-items: center;
  padding-right: 36px;

  &-icon {
    bottom: 0;
    display: flex;

    position: absolute;
    flex-direction: column;
    left: calc(100% - 36px);
    transition: transform .3s;
    transform: translateY(0%);

    &-list {
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
  }

  &Menu-block {
    transform: translateY(50%);
  }
}
</style>
