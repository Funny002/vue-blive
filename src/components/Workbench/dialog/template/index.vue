<template>
  <div class="workbench-template">
    <div class="workbench-template-menu">
      <div class="menu-list menu-list-active">
        <div>{{ $t('home') }}</div>
      </div>
      <div class="menu-list">
        <div class="menu-list-menu">{{ $t('filter') }}</div>
      </div>
      <el-checkbox-group class="template-filter" v-model="filter.checkbox" @change="filterChange">
        <el-checkbox
            :key="item.lang"
            :label="item.value"
            :disabled="item.disabled"
            v-for="item in filter.checkboxList"
        >{{ $t(item.lang) }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="workbench-template-body" :style="{'max-height': maxHeight + 'px'}">
      <div class="template-body-top">
        <el-button
            :key="key"
            :disabled="item.disabled"
            :ref="`${item.name}Button`"
            @click="listBtnClick(item.name)"
            v-for="(item,key) in updateBtnList"
        >
          <div class="template-body-top-div">
            <el-icon name="receiving"/>
            <h3 style="display: flex; align-items: center; justify-content: center;">
              <span>{{ $t('updateBtn.' + item.h3) }}</span>
              <el-tag v-if="item.disabled" type="info" style="margin-left: 10px;">{{ $t('disabled') }}</el-tag>
            </h3>
            <span>{{ $t('updateBtn.' + item.span) }}</span>
          </div>
        </el-button>
      </div>
      <el-alert type="warning" show-icon :title="$t('templateTips')" :closable="false"/>
      <div class="template-list" v-for="(template,key) in templateList" :key="key">
        <el-divider content-position="left">
          <h2>{{ $t(template.h2) }}</h2>
          <span v-if="template.span">{{ $t(template.span) }}</span>
        </el-divider>
        <div class="template-card">
          <el-card class="template-card-list" :body-style="{ padding: '0px' }" v-for="(card,cardKey) in template.cardList" :key="cardKey" shadow="hover">
            <div @click="templateCardClick(card)">
              <el-image>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="template-card-div">
                <h3 style="text-align: left;">{{ $t(card.title) }}</h3>
                <div style="display: flex; flex-wrap: wrap;">
                  <el-tag v-for="(tag,tagKey) in card.tags" :key="tagKey" :type="tag.type" style="margin-top: 10px; margin-right: 10px;">{{ $t(tag.lang) }}</el-tag>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {zipUnPack} from "@/utils/zipBlive";

export default {
  name: "workbench-menu-template",
  data: function () {
    return {
      File: null,
      maxHeight: 0,
      filter: {
        checkbox: [],
        checkboxList: [
          {disabled: false, lang: "test", value: "test"},
          {disabled: false, lang: "official", value: "official"},
          {disabled: false, lang: "free", value: "free"},
          {disabled: false, lang: "vip", value: "vip"},
          {disabled: false, lang: "cooperation", value: "cooperation"},
          {disabled: false, lang: "ball", value: "ball"},
        ],
      },
      updateBtnList: [
        {name: "url", disabled: false, h3: "urlH3", span: "urlSpan"},
        {name: "file", disabled: true, h3: "fileH3", span: "fileSpan"},
      ],
      templateList: [{
        h2: "测试模板",
        span: "",
        cardList: [
          //  5-4-3-5
          {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},
          {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},
          {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},
          {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},
          {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},
          {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},
        ]
      }]
    }
  },
  methods: {
    templateCardClick({uuid}) {
      this.$emit('dialogClose');
      this.$router.push({path: `/workbench/editor/${uuid}`});
    },
    listBtnClick(data) {
      if (data === 'url') {
        this.updateBtnClick()
      }
      if (data === 'file') {
        this.filterChange()
      }
    },
    updateBtnClick() {
      this.$message({message: '功能正在施工中......', type: 'warning'});
    },
    fileCallback() {
      console.log(zipUnPack(this.File.files[0]))
      this.File = null; // 清空
    },
    filterChange() {
      if (!this.File) {
        this.File = document.createElement('input')
        this.File.onchange = this.fileCallback;
        this.File.type = 'file';
      }
      this.File.click()
    }
  },
  mounted() {
    // this.$refs.urlButton.ondragover = this.dragoverFile
    this.$nextTick(() => {
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
