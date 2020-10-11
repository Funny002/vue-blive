<template>
  <div class="WorkbenchDialogHistory" style="background-color: #F0F1EF;">
    <div class="var-cord" style="flex-direction: column;">
      <div class="var-cord">
        <h3>自动保存</h3>
        <el-switch :value="!!authSave" @change="autoSaveChange"/>
      </div>
      <el-collapse-transition>
        <div v-show="authSave" style="width: 100%;">
          <el-divider/>
          <div class="var-cord" style="padding: 0;">
            <div>
              <h2 style="text-align: left;">保存时钟</h2>
              <span style="font-size: 10px; color: #ff2f2f;">
                <el-icon name="info" style="padding-right: 8px; color: #ff2f2f;"/>即多久保存一次的时间 (分)
              </span>
            </div>
            <el-input-number :value="saveClock" :min="10" @change="clockChange"/>
          </div>
        </div>
      </el-collapse-transition>
      <el-alert class="var-cord-alert" title="每一个模板缓存缓存存储有限，超出将替换掉较老的缓存。" type="warning" effect="dark" :closable="false" show-icon style="margin-top: 16px;"/>
    </div>
    <div class="history-body">
      <div class="history-card" v-for="(item,key) in templateList" :key="key">
        <div style="display: flex; align-items: center;">
          <h3>模板序列:</h3>
          <span style="padding-left: 10px; width: 200px; text-align: left;"> {{ key }}</span>
          <span style="margin: 0 50px;"/>
          <h3>缓存个数:</h3>
          <span style="padding-left: 10px;">{{ item.length }} / 10</span>
          <span style="margin: auto;"/>
          <el-button v-if="key === uuid" type="success" @click="$store.commit('Expand/saveNumber')">保存</el-button>
          <el-button type="primary" @click="updateClick(key)">上传</el-button>
          <el-button type="danger" @click="removeClick(key)">删除</el-button>
          <el-button @click="keys = keys === key ? 'index' : key">查看</el-button>
        </div>
        <el-collapse-transition>
          <div v-show="keys === key">
            <el-divider/>
            <div class="history-table">
              <div class="history-table-thead">
                <div style="text-align: center; min-width: 80px;">序号</div>
                <div style="margin-right: auto;">缓存时间</div>
                <div style=" min-width: 80px;">操作</div>
              </div>
              <div class="history-table-tbody" style="flex-direction: column;">
                <template v-for="(dateList,index) in item">
                  <div :key="index" class="history-table-thead">
                    <div style="text-align: center; min-width: 80px;">{{ index }}</div>
                    <div style="margin-right: auto;">{{ new Date(dateList - 0) }}</div>
                    <div>
                      <el-button type="success" @click="ListExportClick(key,dateList)">导出缓存</el-button>
                      <el-button type="primary" @click="ListUseClick(key,dateList)">使用缓存</el-button>
                      <el-button type="danger" @click="ListRemoveClick(key,dateList)">删除缓存</el-button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <div class="history-error" v-if="!templateList">
        <el-icon name="receiving" style=" font-size: 100px;"/>
        <span style=" font-size: 16px;">暂无数据</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Getter} from "vuex-class";
import VueRouter from "vue-router";
import {Component, Vue, Watch} from 'vue-property-decorator'
import {addHistory, delHistory, getHistory, getHistoryList} from "@/utils/history";

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
  }
}

@Component
export default class WorkbenchDialogHistory extends Vue {
  uuid = '';
  keys = '';
  templateList: { [key: string]: string[] } = {}; // 模板缓存
  //
  @Getter('Expand/getSave') authSave?: number; // 是否自动保存
  @Getter('Expand/getSaveView') saveView?: number; // 接收缓存更新通知
  @Getter('Expand/getSaveClock') saveClock?: number; // 自动保存时中

  // 根据缓存更新通知刷新缓存
  @Watch('saveView') getSaveView() {
    this.handleCache() // 刷新
  }

  // 列表导出
  ListExportClick() {
    console.log('ListExportClick')
  }

  // 列表使用
  ListUseClick(uuid: string, date: string) {
    const template = getHistory(uuid, date)
    if (template) {
      const addStatus = addHistory(uuid, Object.assign({}, template))
      if (addStatus) {
        // 删除旧模板
        if (delHistory(uuid, date)) {
          // 跳转
          this.$router.push({path: `/workbench/editor/${uuid}`})
          // 提示
          this.message('模板使用成功', 'success')
          // 关闭窗口
          this.$emit('dialog-close')
        } else {
          this.message('删除旧模板失败！', 'error')
        }
      }
    } else {
      this.message('模板不存在！', 'error')
    }
  }

  // 列表删除
  removeOneself(uuid: string, time: string) {
    const list = [...this.templateList[uuid]];
    if (list.length === 1) {
      this.$alert('删除会吧当前模板全部删除，确定要删除吗。', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        showCancelButton: true,
        type: 'warning',
      }).then(() => {
        this.removeTips(uuid, delHistory(uuid, 1))
      }).catch(() => {
        this.message('取消了删除', 'info')
      })
    } else {
      const status = delHistory(uuid, time)
      this.message(`删除${status ? '成功' : '失败'}`, status ? 'success' : 'error')
    }
  }

  // 列表删除
  ListRemoveClick(uuid: string, time: string) {
    const list = [...this.templateList[uuid]];
    if (this.getUUID() === uuid && time === list.pop()) {
      this.$alert('检测到你正在删除自己正在编辑的模块，确定要删除吗。', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        showCancelButton: true,
        type: 'warning',
      }).then(() => {
        this.removeOneself(uuid, time)
      }).catch(() => {
        this.message('取消了删除', 'info')
      })
    } else {
      this.removeOneself(uuid, time)
    }
  }

  // 删除
  removeClick(key: string) {
    const tips = `取消了，序号: <span style="color: #FF86B2;"> ${key}</span> 的模板删除`;
    this.$alert('删除会吧历史缓存全部删除，确定删除吗。', '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: "取消",
      showCancelButton: true,
      type: 'warning',
    }).then(() => {
      let isRemove = true;
      (async () => {
        key === this.uuid && await this.$alert('检测到你正在删除自己正在编辑的模块，确定要删除吗。', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: "取消",
          showCancelButton: true,
          type: 'error',
        }).catch(() => {
          isRemove = false
        })
        if (isRemove) {
          this.removeTips(key, delHistory(key, 1))
          this.$store.commit('Expand/saveUpdate') // 通知更新
        } else {
          this.message(tips, 'info')
        }
      })()
      console.log(key, this.uuid)
    }).catch(() => {
      this.message(tips, 'info')
    })
  }

  // 删除提示
  removeTips(key: string, status: boolean) {
    const type = status ? 'success' : 'error'
    const html = `序号: <span style="color: #FF86B2;"> ${key}</span> 的缓存删除${status ? '成功' : '失败，请联系管理员。'}`
    this.message(html, type)
  }

  // 取消删除
  message(html: string, type: string) {
    this.$message({message: html, dangerouslyUseHTMLString: true, type});
    this.handleCache()
  }

  // 自动保存
  autoSaveChange(status: boolean) {
    this.$store.dispatch('Expand/save', {type: "setSave", value: status})
  }

  // 自动保存 - 时钟
  clockChange(saveClock: number) {
    this.$store.dispatch('Expand/save', {type: "setSaveClock", value: saveClock})
  }

  // 上传
  updateClick() {
    this.message('上传，功能正在施工中 🚧', 'warning')
  }

  // 解析url
  getUUID(): string {
    const uuid = window.location.href.match(/[\w-]+$/)
    return uuid ? uuid[0] : 'index'
  }

  // 处理缓存
  handleCache() {
    this.templateList = {}
    const cache = getHistoryList();
    for (const key in cache) {
      if (Object.hasOwnProperty.call(cache, key)) {
        this.templateList[key] = Object.keys(cache[key])
      }
    }
  }

  mounted() {
    this.uuid = this.getUUID();
    this.$nextTick(() => {
      this.handleCache()
    })
  }
}
</script>
<style scoped lang="scss">
@import "./style.scss";
</style>
