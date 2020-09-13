<template>
  <div class="workbench-history">
    <div class="card-block card-transition" style="flex-direction: column; box-shadow: 0 0 3px #ddd; z-index: 1;">
      <div class="card-block" style="padding: 0;">
        <h3>{{ $t('autoSave') }}</h3>
        <el-switch :value="authSave" @change="autoSaveChange"/>
      </div>
      <el-collapse-transition>
        <div v-show="authSave">
          <el-divider/>
          <div class="card-block" style="padding: 0;">
            <div style="margin-right: auto;">
              <h2 style="text-align: left;">{{ $t('clock') }}</h2>
              <span style="font-size: 10px; color: #ff2f2f;">
                <el-icon name="info" style="padding-right: 8px;"/>{{ $t('clockTips') }}
              </span>
            </div>
            <el-input-number :value="saveClock" :min="10" @change="clockChange"/>
          </div>
        </div>
      </el-collapse-transition>
    </div>

    <div class="history-card" :style="{'max-height': (maxHeight - (authSave ? 153 : 55)) + 'px'}">
      <div class="history-card-list" v-for="(item,key) in templateList" :key="key">
        <div style="display: flex; align-items: center;">
          <h3>模板序列:</h3>
          <span style="padding-left: 10px;"> {{ key }}</span>
          <span style="margin: auto;"/>
          <el-button type="primary" @click="updateClick(key)">上传</el-button>
          <el-button type="danger" @click="removeClick(key)">删除</el-button>
          <el-button @click="showClick(key)">查看</el-button>
        </div>
        <el-collapse-transition>
          <div v-show="templateKeys === key">
            <el-divider/>
            <el-table style="width: 100%;" :data="item">
              <el-table-column type="index" label="序号" align="center" width="60px"/>
              <el-table-column label="缓存时间">
                <template slot-scope="scope">{{ new Date(scope.row.time) }}</template>
              </el-table-column>
              <!--              <el-table-column label="操作" align="right">-->
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div style="display: flex; justify-content: flex-end;">
                    <el-button @click="ListRemoveClick(scope)">删除缓存</el-button>
                    <el-button @click="ListRemoveClick(scope)">使用缓存</el-button>
                    <el-button @click="ListRemoveClick(scope)">导出缓存</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>


          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {delHistory, listHistory} from "@/utils/history";

export default {
  name: "workbench-menu-history",
  data: function () {
    return {
      maxHeight: 0,
      templateKeys: "",
      templateList: {}
    }
  },
  computed: {
    ...mapGetters('History', {
      'getView': 'getView',
      'saveClock': 'getClock',
      'authSave': 'getAuthSave'
    })
  },
  watch: {
    templateList() {
      // this.templateList = listHistory()
    }
  },
  methods: {
    ListRemoveClick(data) {
      console.log(data)
    },
    updateClick(key) {
      this.$alert('上传模板在只会上传最新的模板文件，确定上传吗。', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        showCancelButton: true,
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'warning',
          message: '功能正在施工中......'
        });
      }).catch(() => {
        this.$notify({
          message: `取消了，序号: <span style="color: #FF86B2;"> ${key}</span> 的模板上传`,
          dangerouslyUseHTMLString: true,
          type: 'info',
        });
      })
    },
    removeClick(key) {
      this.$alert('删除会吧历史缓存全部删除，确定删除吗。', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        showCancelButton: true,
        type: 'warning',
      }).then(() => {
        if (delHistory(key)) {
          this.$message({
            type: 'success',
            message: '缓存删除成功。'
          })
          // 通知其他组件缓存更新了
          // this.templateList = listHistory()
          // this.$store.commit('History/setView')
        } else {
          this.$message({
            type: 'error',
            message: '删除缓存失败，请联系管理员。'
          })
        }
        // 删除内容后不跟新页面数据
        this.templateList = listHistory()
      }).catch(() => {
        this.$notify({
          message: `取消了，序号: <span style="color: #FF86B2;"> ${key}</span> 的模板删除`,
          dangerouslyUseHTMLString: true,
          type: 'info',
        });
      })
    },
    showClick(key) {
      if (this.templateKeys === key) {
        key = ''
      }
      this.templateKeys = key
    },
    clockChange(number) {
      this.$store.commit('History/setClock', number)
    },
    autoSaveChange(isAuto) {
      this.$store.commit('History/setAuthSave', isAuto)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.templateList = listHistory()
      this.maxHeight = document.documentElement['clientHeight'] - 160
      window.onresize = () => {
        this.maxHeight = document.documentElement['clientHeight'] - 160
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<i18n src="./lang.json"/>

