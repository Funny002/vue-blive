<!--<template>-->
<!--  <div class="WorkbenchDialogSite container">-->
<!--    <div class="container-left">-->
<!--      <div class="site-menu">-->
<!--        <template v-for="(item,key) in menuList">-->
<!--          <div class="site-menu-nav" :key="key" v-if="item.isMenu">{{ item.title }}</div>-->
<!--          <div class="site-menu-item" :key="key" v-else :class="{'site-menu-item-hover':menuKeys === item.name}" @click="menuItemClick(item.name)">{{ item.title }}</div>-->
<!--        </template>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="container-right" ref="scroll" style="padding-bottom: 50px;">-->
<!--      <template v-for="(item,key) in componentList">-->
<!--        <component :ref="key" :key="key" :is="item" @menuCallback="menuCallback"/>-->
<!--      </template>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script lang="ts">-->
<!--import {Component, Vue} from 'vue-property-decorator'-->

<!--@Component-->
<!--export default class WorkbenchDialogSite extends Vue {-->
<!--  menuKeys = ''-->
<!--  menuList = []-->
<!--  componentList = {}-->
<!--  menu = {key: '', list: []}-->
<!--  // viewList= ['home', 'expand', 'view', 'notKey', 'about']-->
<!--  viewList = ['home', 'expand', 'view', 'notKey', 'about']-->

<!--  menuCallback(data: []) {-->
<!--    for (const {isMenu, name} of data)-->
<!--      if (!this.menuKeys && !isMenu) {-->
<!--        this.menuKeys = name-->
<!--      }-->
<!--    this.menuList = this.menuList.concat([...data])-->
<!--  }-->

<!--  menuItemClick(name: string) {-->
<!--    this.menuKeys = name-->
<!--    console.log(this.$refs)-->
<!--  }-->

<!--  mounted() {-->
<!--    for (const valPath of this.viewList) {-->
<!--      const value = {[valPath]: () => import(/* webpackChunkName: "WorkbenchDialog" */  `./body/${valPath}/index.vue`)}-->
<!--      this.componentList = Object.assign({}, this.componentList, value)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style scoped lang="scss">-->
<!--.site-menu {-->
<!--  width: 100%;-->
<!--  display: table;-->

<!--  > * {-->
<!--    height: 35px;-->
<!--    text-align: left;-->
<!--    line-height: 35px;-->
<!--  }-->

<!--  &-nav {-->
<!--    color: #888888;-->
<!--    padding-left: 25px;-->
<!--  }-->

<!--  &-item {-->
<!--    width: 100%;-->
<!--    margin: 5px 0;-->
<!--    cursor: pointer;-->
<!--    padding-left: 40px;-->

<!--    &::before {-->
<!--      top: 0;-->
<!--      right: 0;-->
<!--      width: 3px;-->
<!--      content: '';-->
<!--      height: 100%;-->
<!--      position: absolute;-->
<!--      transform: rotateX(90deg);-->
<!--      transition: transform .2s;-->
<!--      background-color: #ff86b2;-->
<!--    }-->

<!--    &:hover {-->
<!--      color: #ff86b2;-->
<!--      //background-color: rgba(255, 134, 178, .1);-->
<!--    }-->

<!--    &-hover {-->
<!--      color: #ff86b2;-->
<!--      background-color: rgba(255, 134, 178, .2);-->

<!--      &::before {-->
<!--        transform: rotateX(0deg);-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--</style>-->
