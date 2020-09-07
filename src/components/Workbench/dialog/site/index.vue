<template>
  <div class="workbench-site" ref="site">
    <div class="workbench-site-menu" :style="{'max-height': maxHeight + 'px'}">
      <div class="menu-list"
           :key="item.lang"
           v-for="item in menu.list"
           :class="{'menu-list-active': item.name === menu.key}"
      >
        <div :class="{'menu-list-menu':item.isMenu}" @click="listClick(item)">{{ $t(item.lang) }}</div>
      </div>
    </div>
    <div class="workbench-site-body" :style="{'max-height': maxHeight + 'px'}">
      <div class="card-block" style="display: flex; align-items: center;">
        <h3 style="margin-right: auto;">{{ $t('langSite') }}</h3>
        <div class="workbench-site-btn">
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
      maxHeight: 0,
      // viewList: ['home', 'account', 'expand', 'news', 'view', 'notKey', 'about'],
      viewList: ['home', 'expand', 'view', 'notKey', 'about'],
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
    for (const valPath of this.viewList) {
      // 填充至 模板列表
      this.componentList.push(() => import(/* webpackChunkName: "WorkbenchDialog" */  `./body/${valPath}/index.vue`))
    }
    this.$nextTick(() => {
      this.maxHeight = document.documentElement['clientHeight'] - 160
      window.onresize = () => {
        this.maxHeight = document.documentElement['clientHeight'] - 160
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";

</style>

<i18n src="./lang.json"/>
