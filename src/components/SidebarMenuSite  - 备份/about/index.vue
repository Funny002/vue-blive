<!--<template>-->
<!--  <div class="site-about">-->
<!--    <el-divider content-position="left"><h3>关于Blive5</h3></el-divider>-->
<!--    <div style="text-align: left;">-->
<!--      <span>简介生成器提供给 B站直播间生成简介使用，具有可视化修改功能。</span>-->
<!--      <div style="margin-top: 10px;">-->
<!--        <el-button size="medium" v-for="item in tipsList" :key="item.lang" @click="routerPush(item.path)">{{ item.lang }}</el-button>-->
<!--      </div>-->
<!--    </div>-->
<!--    <el-divider content-position="left"><h3>贡献者</h3></el-divider>-->
<!--    <div style="text-align: left">-->
<!--      <span style="display: block;">从blive开始一人前行到现在众多贡献用户相伴，少不了他们的帮助，blive到现在还处于维护需感谢他们。</span>-->
<!--      <span style="display: block;">少数愿无偿帮助blive可爱的人们(●'◡'●) —— 致敬"</span>-->
<!--    </div>-->
<!--    <el-table style="margin: 10px 0;" :data="devoteUserList">-->
<!--      <el-table-column label="头像" width="80px" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-avatar style="display: block; margin: auto;" :src="scope.row.avatar">{{ scope.row.name[0] }}</el-avatar>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="用户/昵称" prop="name"/>-->
<!--      <el-table-column label="贡献" prop="devote"/>-->
<!--      <el-table-column label="联系方式" prop="contact">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.contact ? scope.row.contact : "太害羞了，所以不愿意公布" }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--    <span style="text-align: left; display: block;">以上名单不分前后顺序</span>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import {Component, Vue} from "vue-property-decorator";-->

<!--@Component-->
<!--export default class SiteAbout extends Vue {-->
<!--  tipsList = [{lang: "杰出贡献", path: ""}, {lang: "教程", path: ""}, {lang: "赞助", path: ""}]-->
<!--  devoteUserList = [{avatar: "asdasda", name: "ReFunny", devote: "维护人员", contact: "2053423015@qq.com"}]-->

<!--  routerPush(path: string) {-->
<!--    console.log('routerPush :>>', path)-->
<!--  }-->

<!--  mounted() {-->
<!--    this.$nextTick(() => {-->
<!--      const menuData = [-->
<!--        {isMenu: true, title: "其他"},-->
<!--        {isMenu: false, title: "关于Blive", name: "about"}-->
<!--      ]-->
<!--      this.$emit('menuCallback', menuData)-->
<!--    })-->
<!--  }-->
<!--}-->
<!--</script>-->
