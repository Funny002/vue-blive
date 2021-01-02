<template>
  <window-dialog classes="MenuHelp" :show="dialogShow" title="帮助" @close="onClose">

    <p>简介生成器提供给 B站直播间生成简介使用，具有可视化修改功能。</p>
    <div class="">
      <el-button size="medium" v-for="item in tipsList" :key="item.lang">{{ item.lang }}</el-button>
    </div>
    <p>内核版本: 4.20170513.1 beta</p>
    <p>Froala插件版本: 2.0</p>
    <p>Blive5 依赖于xxxxxxx开发</p>
    <p>储存功能(包含Blive上的图片资源)由5xge.com提供，感谢。</p>
    <p><b>作者</b>:Cabbagelol</p>
    <p><b>联系</b>:nickmiku@foxmail.com</p>
    <p><b>Cookie</b>:<span id="Blve-cookie">支持</span></p>
    <p>Blive会储存你的数据在本地，这依靠的是cookie，如果不支持，Blive4将无法帮助你保存你的一些简介内容</p>
    <p>如果你有兴趣对Blive进行开发，欢迎向<s>nickmiku@foxmail.com</s>funnydsu@qq.com投稿，描述下你自己，留下你想对我想说的；希望会在项目小组中共同以学习来向Blive 5贡献更多功能代码。</p>
    <el-divider content-position="left"><h3>贡献者</h3></el-divider>
    <div style="text-align: left">
      <span style="display: block;">从blive开始一人前行到现在众多贡献用户相伴，少不了他们的帮助，blive到现在还处于维护需感谢他们。</span>
      <span style="display: block;">少数愿无偿帮助blive可爱的人们(●'◡'●) —— 致敬"</span>
    </div>
    <el-table style="margin: 10px 0;" :data="devoteUserList">
      <el-table-column label="头像" width="80px" align="center">
        <template slot-scope="scope">
          <el-avatar style="display: block; margin: auto;" :src="scope.row.avatar">{{ scope.row.name[0] }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="用户/昵称" prop="name"/>
      <el-table-column label="贡献" prop="devote"/>
      <el-table-column label="联系方式" prop="contact">
        <template slot-scope="scope">
          <span>{{ scope.row.contact ? scope.row.contact : "太害羞了，所以不愿意公布" }}</span>
        </template>
      </el-table-column>
    </el-table>
    <span style="text-align: left; display: block;">以上名单不分前后顺序</span>
    <div class="SidebarMenuModuleHelp" style="display: none">SidebarMenuModuleHelp</div>
  </window-dialog>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from "@/components/SidebarMenu/verifyRules";

@Component
export default class SidebarMenuModuleHelp extends Vue {
  dialogShow = false
  tipsList = [{lang: "杰出贡献", path: ""}, {lang: "教程", path: ""}, {lang: "赞助", path: ""}]
  devoteUserList = [{avatar: "asdasda", name: "ReFunny", devote: "维护人员", contact: "xxxxx@qq.com"}]


  onInit() {
    this.$message.warning('功能正在施工中......')
    // this.dialogShow = true
  }

  onClose() {
    this.dialogShow = false
  }

  created() {
    const data: MenuItem = {name: 'SidebarMenuModuleHelp', icon: 'question-circle-o', title: "帮助", sort: 1}
    this.$emit('callBack', data)
  }
}
</script>

<style lang="scss" src="./help.scss"/>
