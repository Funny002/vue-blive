<template>
  <div class="workbench-site">
    <div class="workbench-site-menu">
      <div class="menu-list"
           :key="item.lang"
           v-for="item in menu.list"
           :class="{'menu-list-active': item.name === menu.key}"
      >
        <div :class="{'menu-list-menu':item.isMenu}" @click="listClick(item)">{{ $t(item.lang) }}</div>
      </div>

    </div>
    <div class="workbench-site-body">
      <div class="workbench-site-home" style="display: flex; align-items: center;">
        <h3 style="margin-right: auto;">{{ $t('langSite') }}</h3>
        <div>
          <lang-module/>
        </div>
      </div>
      <component v-for="item in componentList" :key="item.name" :is="item" @menuCallback="menuCallback"/>
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
      viewList: ['home'],
      componentList: [],
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
      // 填充到菜单
      this.menu.list = (this.menu.list).concat(...data)
      for (const valData of data) {
        // 菜单列表无数据
        if (!this.menu.key && !valData.isMenu) {
          this.listClick(valData)
        }
      }
    },
    // 菜单点击
    listClick({name, isMenu}) {
      if (!isMenu) {
        this.menu.key = name
      }
      // document.querySelector("#header").scrollIntoView(true);
      // console.log(path)
    }
  },
  mounted() {
    // 获取需要加载的列表
    const viewList = [this.viewList]
    for (const valPath of viewList) {
      // 填充至 模板列表
      this.componentList.push(() => import(/* webpackChunkName: "WorkbenchDialog" */  `./body/${valPath}/index.vue`))
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<i18n src="./lang.json"/>
