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
      <component v-for="(item,key) in componentList" :key="key" :is="item" @menuCallback="menuCallback"/>
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
      componentList: {},
      menu: {key: null, list: []},
      viewList: ['home', 'expand', 'view', 'notKey', 'about'],
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
        this.$el.querySelector(`.site-${name}`).scrollIntoView()
      }
    }
  },
  mounted() {
    // 获取需要加载的列表
    for (const valPath of this.viewList) {
      // 填充至 模板列表
      this.componentList[valPath] = () => import(/* webpackChunkName: "WorkbenchDialog" */  `./body/${valPath}/index.vue`)
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
