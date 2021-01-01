<template>
  <window-dialog classes="MenuGallery" :show="dialogShow" title="图库" @close="onClose">
    <div class="MenuGallery__card">
      <div class="MenuGallery__card-search">
        <el-input placeholder="请输入内容" size="medium">
          <el-button slot="append" @click="searchIconCLick">
            <fa-icon name="search"/>
          </el-button>
        </el-input>
      </div>
      <div class="MenuGallery__card-tabs">
        <el-tabs v-model="tabs.value">
          <el-tab-pane v-for="(item,key) in tabs.list" :key="key" :label="item.label" :name="item.name"/>
        </el-tabs>
      </div>
    </div>
    <div class="MenuGallery__body">
      <!-- 瀑布流? -->
      <template v-for="(item,key) in ImageList">
        <div class="MenuGallery__body-item" :key="key" @click="onImageClick(item)">
          <img :src="item.src" :alt="item.alt"/>
        </div>
      </template>
    </div>
  </window-dialog>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";

@Component
export default class SidebarMenuModuleGallery extends Vue {
  dialogShow = false
  tabs = {
    list: [
      {label: "test", name: "0"},
      {label: "test1", name: "1"},
      {label: "test2", name: "2"},
      {label: "test3", name: "3"},
    ],
    value: ""
  }
  ImageList = [
    {src: require('@/assets/logo.png'), alt: "logo"},
    {src: require('@/assets/logo.png'), alt: "logo"},
    {src: require('@/assets/logo.png'), alt: "logo"},
    {src: require('@/assets/logo.png'), alt: "logo"},
    {src: require('@/assets/logo.png'), alt: "logo"},
    {src: require('@/assets/logo.png'), alt: "logo"},
  ]

  onInit() {
    this.dialogShow = true
  }

  onClose() {
    this.dialogShow = false
  }

  onImageClick(item) {
    console.log(item)
  }

  searchIconCLick() {
    console.log('icon :>> searchIconCLick')
  }

  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleGallery', icon: 'image', title: "图库", sort: 9}
    this.$emit('callBack', data)
  }
}
</script>
<style lang="scss" src="./gallery.scss"/>