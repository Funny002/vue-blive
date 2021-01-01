<template>
  <window-dialog classes="MenuRelease" :show="dialogShow" title="发布" @close="onClose">

    <div class="MenuRelease__canvas">
      <!-- div 转 canvas 保存图片？ -->
      <canvas></canvas>
    </div>

    <div class="MenuRelease__form">
      <el-form>
        <el-form-item ><el-input><template slot="prepend">uid</template></el-input></el-form-item>
        <el-form-item ><el-input><template slot="prepend">名称</template></el-input></el-form-item>
        <el-form-item ><el-input><template slot="prepend">作者</template></el-input></el-form-item>
        <el-form-item ><el-input><template slot="prepend">版本</template></el-input></el-form-item>
        <el-form-item ><el-input><template slot="prepend">注释</template></el-input></el-form-item>
      </el-form>
      <div class="MenuRelease__form-btn">
      <el-button>发布</el-button>
      </div>
    </div>

  </window-dialog>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";

@Component
export default class SidebarMenuModuleRelease extends Vue {
  dialogShow = false

  onInit() {
    this.dialogShow = true
  }

  onClose() {
    this.dialogShow = false
  }

  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleRelease', icon: 'paper-plane-o', title: "发布", sort: 10}
    this.$emit('callBack', data)
  }
}
</script>

<style lang="scss" src="./release.scss"/>