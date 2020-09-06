<template>
  <div class="workbench-site">
    <div class="workbench-site-menu">
      <div class="menu-list"
           :key="item.lang"
           v-for="item in menu.list"
           :class="{'menu-list-active':item.lang===menu.key}"
      >
        <div :class="{'menu-list-menu':item.isMenu}" @click="listClick(item)">{{ $t(item.lang) }}</div>
      </div>

    </div>
    <div class="workbench-site-body">
      <div style="display: flex; align-items: center;">
        <h3 style="margin-right: auto;">{{ $t('langSite') }}</h3>
        <lang-module/>
      </div>
      <component v-for="item in component.list" :key="item.name" :is="item" @menuCallback="menuCallback"/>
    </div>
  </div>
</template>

<script>
import LangModule from "@/components/Lang/index";

export default {
  components: {'lang-module': LangModule},
  name: "workbench-menu-site",
  data: function () {
    return {
      component: {
        list: []
      },
      menu: {
        key: null,
        list: [
          // {isMenu: true, lang: 'home'},
          // {isMenu: false, lang: 'asdasd', path: 'asda'},
        ]
      }
    }
  },
  methods: {
    // 回调填充
    menuCallback(data) {
      this.menu.list.push(data);
      if (!this.menu.key && !data.isMenu) {
        this.listClick(data)
      }
    },
    // 菜单点击
    listClick({lang: name, path = null}) {
      if (path) {
        this.menu.key = name
      }
      // document.querySelector("#header").scrollIntoView(true);
      console.log(path)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<i18n src="./lang.json"/>
