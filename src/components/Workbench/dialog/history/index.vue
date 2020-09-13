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

    <div class="history-card" v-if="cardShow" :style="{'max-height': (maxHeight - (authSave ? 153 : 55)) + 'px'}">
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
                    <el-button type="success" @click="ListExportClick(key,scope.row)">导出缓存</el-button>
                    <el-button type="primary" @click="ListUseClick(key,scope.row)">使用缓存</el-button>
                    <el-button type="danger" @click="ListRemoveClick(key,scope.row.time)">删除缓存</el-button>
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
import {addHistory, delHistory, getHistory, listHistory} from "@/utils/history";

export default {
  name: "workbench-menu-history",
  data: function () {
    return {
      maxHeight: 0,
      cardShow: true,
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
    getView() {
      this.cardShow = false
      this.templateList = listHistory()
      this.cardShow = true
    }
  },
  methods: {
    ListUseClick(uuid, {value, time}) {
      this.$alert('如果工作台中的内容未保存将丢失，确定继续吗？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: "取消",
        showCancelButton: true,
        type: 'warning',
      }).then(() => {
        if (addHistory(uuid, value, time)) {
          this.$message({
            type: 'success',
            message: '使用成功。'
          });
        } else {
          this.$message({
            type: 'error',
            message: '使用失败。'
          });
        }
        // 通知其他组件更新缓存
        this.$store.commit('History/setView')
      }).catch(() => {
        //
      })
    },
    ListExportClick(uuid, time) {
      console.log(uuid, time)
      this.$message({
        type: 'warning',
        message: '功能正在施工中......'
      });
    },
    ListRemoveClick(key, time) {
      // 判断是否只有一个缓存
      let isRemove = true;
      let history = getHistory(key)
      if (history.time === time) {
        (async () => {
          await this.$alert('检测到你正在删除自己正在编辑的模块，确定要删除吗。', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: "取消",
            showCancelButton: true,
            type: 'warning',
          }).catch(() => {
            isRemove = false
          })
          if (isRemove) {
            let isAll = false;
            history = getHistory(key, 'all');
            if (Object.keys(history).length <= 1) {
              await (async () => {
                await this.$alert('当前模板只有这一个缓存，继续删除将会全部删除，确定删除吗?', '系统提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: "取消",
                  showCancelButton: true,
                  type: 'warning',
                }).then(() => {
                  isAll = true
                }).catch(() => {
                  isRemove = false
                })
              })()
            }
            if (isRemove) {
              // 通知其他组件更新缓存
              if (delHistory(key, isAll ? 0 : time)) {
                this.$message({
                  type: 'success',
                  message: '缓存删除成功。'
                })
                this.$store.commit('History/setView')
              } else {
                this.$message({
                  type: 'error',
                  message: '删除缓存失败，请联系管理员。'
                })
              }
            }
          }
          if (!isRemove) {
            this.$message({
              message: `取消了，删除缓存。`,
              type: 'info',
            });
          }
        })()
      }
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
        this.$message({
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
        let isRemove = true
        const uuid = window.location.href.match(/([\w-]+)$/)[1];
        (async () => {
          if (key === uuid) {
            await this.$alert('检测到你正在删除自己正在编辑的模块，确定要删除吗。', '系统提示', {
              confirmButtonText: '确定',
              cancelButtonText: "取消",
              showCancelButton: true,
              type: 'error',
            }).catch(() => {
              isRemove = false
            })
          }
          if (isRemove) {
            if (delHistory(key)) {
              this.$message({
                type: 'success',
                message: '缓存删除成功。'
              })
            } else {
              this.$message({
                type: 'error',
                message: '删除缓存失败，请联系管理员。'
              })
            }
            // 通知其他组件更新缓存
            this.$store.commit('History/setView')
          }
        })()
      }).catch(() => {
        this.$message({
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
