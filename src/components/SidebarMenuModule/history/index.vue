<template>
  <window-dialog classes="MenuHistory" :show="dialogShow" title="缓存" @close="onClose">
    <div class="MenuHistory__card">
      <el-alert title="自动保存时可能导致系统卡顿，请耐心等待..." type="warning" :closable="false" :center="false" show-icon/>
      <div class="MenuHistory__card-header">
        <h3 class="MenuHistory__card-header-title">自动保存</h3>
        <el-switch v-model="extendShow"/>
      </div>
      <el-collapse-transition>
        <div class="MenuHistory__card-body" v-show="extendShow">
          <div class="MenuHistory__card-body-nav">
            <h3 class="MenuHistory__card-body-title">保存间隔</h3>
            <div class="MenuHistory__card-body-text">自动保存间隔，默认单位分钟</div>
          </div>
          <el-input-number :min="10" v-model="timeClock"/>
        </div>
      </el-collapse-transition>
    </div>
    <div class="MenuHistory__body">
      <template v-for="(item,key) in HistoryList">
        <sidebar-menu-module-template-item :key="key" :item="item" :extend-show="item.uuid === uuidKeys"/>
      </template>
    </div>
  </window-dialog>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";
import SidebarMenuModuleTemplateItem from "./index-item.vue";
import {HistoryListItem} from './verifyRules'

@Component({components: {SidebarMenuModuleTemplateItem}})
export default class SidebarMenuModuleHistory extends Vue {
  HistoryList: HistoryListItem[] = []
  dialogShow = false
  timeClock = 10
  extendShow = false
  uuidKeys = ''

  onInit() {
    this.dialogShow = true
  }

  onClose() {
    this.dialogShow = false
  }

  // 自加载菜单回调
  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleHistory', icon: 'history', title: "缓存", sort: 8}
    this.$emit('callBack', data)
  }
}
</script>
<style lang="scss" src="./history.scss"/>