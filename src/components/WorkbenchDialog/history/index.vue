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
      <div class="history-card-list" v-for="(item,key) in templateList" :key="key">
        <div style="display: flex; align-items: center;">
          <h3>模板序列:</h3>
          <span style="padding-left: 10px; width: 200px; text-align: left;"> {{ key }}</span>
          <span style="margin: 0 50px;"/>
          <h3>缓存个数:</h3>
          <span style="padding-left: 10px;">{{ item.length }} / 10</span>
          <span style="margin: auto;"/>
          <!--          <el-button type="primary" @click="updateClick(key)">上传</el-button>-->
          <!--          <el-button v-if="key === uuid" type="success" @click="saveClick()">保存</el-button>-->
          <!--          <el-button type="danger" @click="removeClick(key)">删除</el-button>-->
          <!--          <el-button @click="showClick(key)">查看</el-button>-->
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
      <div class="history-error" v-if="!templateList.length">
        <el-icon name="receiving" style=" font-size: 100px;"/>
        <span style=" font-size: 16px;">暂无数据</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Getter} from "vuex-class";
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class WorkbenchDialogHistory extends Vue {
  templateUuid = ''
  templateKeys = ''
  templateList = []
  //
  @Getter('Expand/getSave') authSave?: number
  @Getter('Expand/getSaveClock') saveClock?: number

  updateClick() {
    console.log('updateClick')
  }

  ListExportClick() {
    console.log('ListExportClick')
  }

  ListUseClick() {
    console.log('ListUseClick')
  }

  ListRemoveClick() {
    console.log('ListRemoveClick')
  }

  autoSaveChange(status: boolean) {
    this.$store.dispatch('Expand/save', {type: "setSave", value: status})
  }

  clockChange(saveClock: number) {
    this.$store.dispatch('Expand/save', {type: "setSaveClock", value: saveClock})
  }

  mounted() {
    this.$nextTick(() => {
      // console.log(getHistoryList())
    })
  }
}
</script>
<style scoped lang="scss">
.WorkbenchDialogHistory {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.history {
  &-body {
    width: 100%;
    padding: 32px;
    flex: 1 1 auto;
    overflow-y: auto;
  }

  &-error > * {
    width: 100%;
    color: #8e8e8e;
    display: block;
  }
}
</style>
