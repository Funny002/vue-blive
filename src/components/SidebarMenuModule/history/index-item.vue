<template>
  <div class="MenuHistoryItem" :class="{'MenuHistoryItem__show':extendShow}">
    <div class="MenuHistoryItem__header">
      <div class="MenuHistoryItem__header-title"><h3>模板序列号：</h3>{{ item.uuid }}</div>
      <div class="MenuHistoryItem__header-btn">
        <el-button type="success" @click="$emit('click','upload',item)">上传</el-button>
        <el-button type="primary" @click="$emit('click','use',item)">使用</el-button>
        <el-button type="danger" @click="$emit('click','delete',item)">删除</el-button>
      </div>
      <fa-icon class="MenuHistoryItem__header-icon" name="angle-left" @click="$emit('icon-click')"/>
    </div>
    <el-collapse-transition>
      <div class="MenuHistoryItem__extend" v-show="extendShow">
        <el-table border>
          <el-table-column type="index" label="序号" align="center"/>
          <el-table-column label="缓存时间"></el-table-column>
          <el-table-column label="大小"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-button type="primary" @click="$emit('item-click','use',$index,row)">使用</el-button>
              <el-button type="danger" @click="$emit('item-click','delete',$index,row)">删除</el-button>
              <el-button type="success" @click="$emit('item-click','download',$index,row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {HistoryListItem} from './verifyRules'

@Component
export default class SidebarMenuModuleHistoryItem extends Vue {
  @Prop() extendShow?: boolean
  @Prop() item?: HistoryListItem
}
</script>