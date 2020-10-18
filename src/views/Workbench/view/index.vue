<template>
  <div class="WorkbenchView">

    <template v-if="!error">
      <div class="WorkbenchView-tips">
        <h1>从现在开始定制你的第一个Blive简介</h1>
      </div>
    </template>
    <template v-else>
      <div class="WorkbenchView-tips">
        <img src="../../../assets/image/original.png" alt="error"/>
        <h2>抱歉, 系统无法读取简介UUID, 它可能已经不存在了。</h2>
      </div>
    </template>
    <div class="WorkbenchView-card">
      <el-card v-for="(item,key) in CardList" :key="key" shadow="hover">
        <div class="WorkbenchView-card-item" @click="viewCardListClick(item.name)">
          <el-icon class="WorkbenchView-card-icon" :name="item.icon"/>
          <h2 class="view-card-title">{{ item.lang.title }}</h2>
          <span class="view-card-msg">{{ item.lang.msg }}</span>
        </div>
      </el-card>
    </div>
    <h4 class="WorkbenchView-footer">
      <span>{{ Copyright }}</span>
      <span>{{ Version }}</span>
    </h4>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
//
import {arrayHas} from "@/utils/assist";
import {newTemplate} from "@/utils/template";

@Component
export default class WorkbenchView extends Vue {
  @Prop({default: false}) error?: string;
  Version = ''
  Copyright = ''
  CardList = [
    {name: 'new', lang: {title: "创建空白文件", msg: "没有任何内容，需要了解使用方法"}, icon: "edit-outline"},
    {name: 'file', lang: {title: "导入文件", msg: "导入本地文件进行解析"}, icon: "document-add"},
    {name: 'history', lang: {title: "加载存档", msg: "导入存档缓存文件"}, icon: "receiving"},
    {name: 'url', lang: {title: "远程获取", msg: "通过网络获取文件解析"}, icon: "sort"},
  ]

  viewCardListClick(name: string) {
    if (arrayHas(['file', 'url'], name)) {
      return this.$message({message: '功能正在施工中......', type: 'warning'});
    }
    const funcMap: { [key: string]: () => void } = {
      // 创建空白模板
      new: () => newTemplate((uuid: string, status: boolean) => {
        if (!status) {
          return this.$message({message: '创建模板随便', type: 'warning'});
        }
        this.$router.push({path: '/workbench/editor/' + uuid})
      }),
      // 通知打开 history 窗口
      history: () => this.$store.commit('WorkbenchDialog/setPath', 'history')
    }
    return funcMap[name]()
  }

  activated() {
    this.$emit('is-editor', false)
  }

  mounted() {
    // 存在就强制跳转到 error
    this.error && this.error !== 'error' && this.$router.push({path: "/workbench/index/error"})
    this.$emit('is-editor', false)
    const {getVersion, getCopyright} = this.$store.getters
    this.Version = getVersion
    this.Copyright = getCopyright
  }
}
</script>
<style scoped lang="scss">
.WorkbenchView {
  top: 40vh;
  left: 50%;
  display: table;
  position: absolute;
  transform: translate(-50%, -40%);

  &-card {
    width: 620px;
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;
    justify-content: space-between;

    &-icon {
      font-size: 40px;
    }

    /deep/
    .el-card {
      width: 300px;
      cursor: pointer;
      margin-top: 20px;
    }
  }

  &-footer {
    display: flex;
    line-height: 25px;
    justify-content: space-between;
  }
}
</style>
