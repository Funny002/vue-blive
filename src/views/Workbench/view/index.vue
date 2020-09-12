<template>
  <div class="view">
    <template v-if="!error">
      <div class="view-tips">
        <h1>{{ $t('tips') }}</h1>
      </div>
    </template>
    <template v-else>
      <div class="view-tips">
        <img src="../../../assets/image/original.png" alt="error"/>
        <h2>{{ $t('errorTips') }}</h2>
      </div>
    </template>
    <div class="view-card">
      <el-card v-for="(item,key) in card.list" :key="key" shadow="hover">
        <div class="view-card-list" @click="viewCardListClick(item.name)">
          <el-icon class="view-card-icon" :name="item.icon"/>
          <h2 class="view-card-title">{{ $t(item.lang.title) }}</h2>
          <span class="view-card-msg">{{ $t(item.lang.msg) }}</span>
        </div>
      </el-card>
    </div>
    <h4 class="view-footer">
      <span>{{ vuex.Copyright }}</span>
      <span>{{ vuex.Version }}</span>
    </h4>

    <el-dialog class="">

    </el-dialog>

  </div>
</template>

<script>
import {newTemplate} from '@/utils/template.js'

// const templatePath = "/workbench/editor/"
export default {
  name: "workbench-view",
  props: ['error'],
  data: function () {
    return {
      vuex: {},
      card: {
        list: [
          {name: 'new', lang: {title: "card.edit", msg: "msg.edit"}, icon: "edit-outline"},
          {name: 'file', lang: {title: "card.add", msg: "msg.add"}, icon: "document-add"},
          {name: 'history', lang: {title: "card.archive", msg: "msg.archive"}, icon: "receiving"},
          {name: 'url', lang: {title: "card.transport", msg: "msg.transport"}, icon: "sort"},
        ]
      }
    }
  },
  methods: {
    new_Template() {
      // const uuid =
      newTemplate(this).then((...data) => {
        console.log(data)
      })
      // if (uuid) {
      //   this.$router.push({path: templatePath + uuid})
      // } else {
      //   this.$message.error('系统创建空白文件随便，请联系管理员。');
      // }
    },
    file_Template() {

    },
    url_Template() {
      this.$prompt('请输入模板地址URL', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^http(s?):\/\/([\w./]+)/,
        inputErrorMessage: '网站地址不正确',
      }).then(({value}) => {
        // end
        console.log(value)
        // end
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    history_Template() {
    },
    viewCardListClick(name) {
      if (['url', 'file', 'history'].includes(name)) {
        this.$message({
          message: '功能正在施工中......',
          type: 'warning'
        });
      } else {
        this[`${name}_Template`]()
      }
    }
  },
  mounted() {
    // 存在就强制跳转到 error
    this.error && this.error !== 'error' && this.$router.push({path: "/workbench/index/error"})
    const {getVersion: Version, getCopyright: Copyright} = this.$store.getters
    this.vuex = {Version, Copyright}
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<i18n src="./lang.json"/>
