<template>
  <window-dialog classes="MenuTemplate" :show="dialogShow" title="Blive5模板" @close="onClose">
    <div class="MenuTemplate-left">
      <div class="MenuTemplate-left__menu MenuTemplate-left__menu-btn">
        <span class="">首页</span>
      </div>
      <div class="MenuTemplate-left__menu">
        <span class="">筛选</span>
      </div>
      <el-checkbox-group class="MenuTemplate-left__list" v-model="filtrateValue">
        <template v-for="(item,key) in filtrateList">
          <el-checkbox class="MenuTemplate-left__item" :key="key" :label="item" :disabled="item.disabled">{{ item.label }}</el-checkbox>
        </template>
      </el-checkbox-group>
    </div>
    <div class="MenuTemplate-right">
      <!-- 表头 ~ 其他载入方法 -->
      <div class="MenuTemplate-right__top">
        <div class="MenuTemplate-right__btn">
          <fa-icon class="MenuTemplate-right__btn-icon" name="home"/>
          <div class="MenuTemplate-right__btn-nav">
            <h2 class="MenuTemplate-right__btn-title">标题</h2>
            <div class="MenuTemplate-right__btn-text">注释</div>
          </div>
        </div>
        <div class="MenuTemplate-right__btn">
          <fa-icon class="MenuTemplate-right__btn-icon" name="home"/>
          <div class="MenuTemplate-right__btn-nav">
            <h2 class="MenuTemplate-right__btn-title">标题</h2>
            <div class="MenuTemplate-right__btn-text">注释</div>
          </div>
        </div>
      </div>
      <el-alert title="外部导入的内容不受Blive控制, 无法支持特定模块,甚至引起排版问题。" type="warning" :closable="false" :center="false" show-icon/>

      <div class="MenuTemplate-right-body">
        <sidebar-menu-module-template-item v-for="(item,key) in TemplateList" :key="key" :template-list="item.template" :divider="item.divider" @click="onClick"/>
        <!-- 模板 -->
      </div>
    </div>

  </window-dialog>
</template>

<!-- script -->
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SidebarMenuModuleTemplateItem from "./index-item.vue";
import {MenuItem} from "@/components/SidebarMenu/verifyRules";
import {TemplateDivider, TemplateListItem, FiltrateList} from './verifyRules'

@Component({components: {SidebarMenuModuleTemplateItem}})
export default class SidebarMenuModuleTemplate extends Vue {
  dialogShow = false
  TemplateList: { divider: TemplateDivider; template: TemplateListItem[] }[] = [];
  filtrateList: FiltrateList[] = []
  filtrateValue: FiltrateList[] = []

  // 进入方法
  onInit() {
    this.dialogShow = true
  }

  // 窗口关闭事件
  onClose() {
    this.dialogShow = false
  }

  // 模板点击事件
  onClick(item: TemplateListItem, event: Event) {
    console.log(item, event)
  }

  mounted() {
    this.filtrateList = []
    for (let i = 0; i < 10; i++) {
      this.filtrateList.push({disabled: false, label: "test" + i})
    }
    //
    this.TemplateList = [{
      divider: {label: "text", text: "注释 ~ 提示 ~ 说明"},
      template: [{
        src: require('@/assets/logo.png'),
        alt: "test",
        label: "测试",
        tag: [{type: "success", label: "text"}, {type: "success", label: "text"}, {type: "success", label: "text"}]
      }, {
        src: require('@/assets/logo.png'),
        alt: "test",
        label: "测试",
        tag: [{type: "success", label: "text"}]
      }, {
        src: require('@/assets/logo.png'),
        alt: "test",
        label: "测试",
        tag: [{type: "success", label: "text"}]
      }, {
        src: require('@/assets/logo.png'),
        alt: "test",
        label: "测试",
        tag: [{type: "success", label: "text"}]
      }]
    }, {
      divider: {label: "text", text: "注释 ~ 提示 ~ 说明"},
      template: [{
        src: require('@/assets/logo.png'),
        alt: "test",
        label: "测试",
        tag: [{type: "success", label: "text"}]
      }, {
        src: require('@/assets/logo.png'),
        alt: "test",
        label: "测试",
        tag: [{type: "success", label: "text"}]
      }, {
        src: require('@/assets/logo.png'),
        alt: "test",
        label: "测试",
        tag: [{type: "success", label: "text"}]
      }, {
        src: require('@/assets/logo.png'),
        alt: "test",
        label: "测试",
        tag: [{type: "success", label: "text"}]
      }]
    }] as { divider: TemplateDivider; template: TemplateListItem[] }[]
  }


  // 自加载菜单回调
  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleTemplate', icon: 'th-large', title: "模板", sort: 4}
    this.$emit('callBack', data)
  }
}
</script>

<!-- style -->
<style lang="scss" src="./template.scss"/>
