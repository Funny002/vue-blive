<!--<template>-->
<!--  <div class="WorkbenchDialogTemplate container">-->
<!--    <div class="container-left">-->
<!--      <div class="template-menu template-menu-active">首页</div>-->
<!--      <div class="template-menu template-menu-nav">筛选</div>-->
<!--      <el-checkbox-group class="template-filter" v-model="filter.checkbox" @change="filterChange">-->
<!--        <el-checkbox-->
<!--            :key="item.lang"-->
<!--            :label="item.value"-->
<!--            :disabled="item.disabled"-->
<!--            v-for="item in filter.checkboxList"-->
<!--        ></el-checkbox>-->
<!--      </el-checkbox-group>-->
<!--    </div>-->
<!--    <div class="container-right">-->
<!--      <div class="template-top">-->
<!--        <template v-for="(item,key) in updateBtnList">-->
<!--          <el-button :key="key" :disabled="item.disabled" :ref="`${item.name}Button`" @click="listBtnClick(item.name)">-->
<!--            <el-icon name="receiving"/>-->
<!--            <h3 style="display: flex; align-items: center; justify-content: center;">-->
<!--              <span v-text="item.h3"/>-->
<!--              <el-tag v-if="item.disabled" type="info" style="margin-left: 10px;">禁用</el-tag>-->
<!--            </h3>-->
<!--            <span style="line-height: 25px;" v-text="item.span"/>-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </div>-->
<!--      <el-alert type="warning" show-icon title="外部导入的内容不受Blive控制, 无法支持特定模块,甚至引起排版问题。" :closable="false"/>-->
<!--      <template v-for="(template,key) in templateList">-->
<!--        <div class="template-list" :key="key">-->
<!--          <el-divider content-position="left">-->
<!--            <h2 v-text="template.h2"/>-->
<!--            <span v-if="template.span" v-text="template.span"/>-->
<!--          </el-divider>-->
<!--          <div class="template-card">-->
<!--            <template v-for="(card,cardKey) in template.cardList">-->
<!--              <el-card class="template-card-list" :key="cardKey" :body-style="{ padding: '0px' }" shadow="hover">-->
<!--                <div @click="templateCardClick(card)">-->
<!--                  <el-image>-->
<!--                    <div slot="error" class="image-slot">-->
<!--                      <i class="el-icon-picture-outline"></i>-->
<!--                    </div>-->
<!--                  </el-image>-->
<!--                  <div class="template-card-div">-->
<!--                    <h3 style="text-align: left;" v-text="card.title"/>-->
<!--                    <div style="display: flex; flex-wrap: wrap;">-->
<!--                      <el-tag v-for="(tag,tagKey) in card.tags" :key="tagKey" :type="tag.type" style="margin-top: 10px; margin-right: 10px;">{{ tag.lang }}</el-tag>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </el-card>-->
<!--            </template>-->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script lang="ts">-->
<!--import {Component, Vue} from 'vue-property-decorator'-->

<!--interface CardList {-->
<!--  uuid: string;-->
<!--  title: string;-->
<!--  tags: { [key: string]: string }[];-->
<!--}-->

<!--interface TemplateList {-->
<!--  h2: string;-->
<!--  span: string;-->
<!--  cardList: CardList[];-->
<!--}-->

<!--@Component-->
<!--export default class WorkbenchDialogTemplate extends Vue {-->
<!--  updateBtnList = [-->
<!--    {name: "url", disabled: true, h3: "导入直播简介", span: "远程获取直播间简介"},-->
<!--    {name: "file", disabled: true, h3: "导入.blive文件", span: "你可从本地导入简介到blive中"},-->
<!--  ]-->

<!--  filter = {-->
<!--    checkbox: [],-->
<!--    checkboxList: [-->
<!--      {disabled: false, lang: "测试0", value: "test0"},-->
<!--      {disabled: false, lang: "测试1", value: "test1"},-->
<!--      {disabled: false, lang: "测试2", value: "test2"},-->
<!--    ],-->
<!--  }-->

<!--  templateList: TemplateList[] = [{-->
<!--    h2: "测试模板",-->
<!--    span: "",-->
<!--    cardList: [-->
<!--      //  5-4-3-5-->
<!--      {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},-->
<!--      {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},-->
<!--      {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},-->
<!--      {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},-->
<!--      {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},-->
<!--      {uuid: 'xaaag-asda-asd-asdqw', title: "测试用", tags: [{lang: "test"}, {lang: "free", type: "success"}]},-->
<!--    ]-->
<!--  }]-->

<!--  filterChange(value: [string]) {-->
<!--    console.log(value)-->
<!--  }-->

<!--  listBtnClick(name: string) {-->
<!--    console.log(name)-->
<!--    this.$message({message: '功能正在施工中......', type: 'warning'});-->
<!--  }-->

<!--  templateCardClick(card: CardList) {-->
<!--    console.log(card)-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style scoped lang="scss">-->
<!--.WorkbenchDialogTemplate {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  position: relative;-->
<!--  background-color: #f0f1ef;-->

<!--}-->


<!--.template-card {-->
<!--  width: 100%;-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->

<!--  &-list {-->
<!--    min-width: 200px;-->
<!--    margin-right: 20px;-->
<!--    margin-bottom: 20px;-->
<!--    border-color: #dedede;-->
<!--    box-sizing: border-box;-->
<!--    width: calc(25% - 20px);-->

<!--    /deep/-->
<!--    .el-image {-->
<!--      width: 100%;-->
<!--      display: block;-->
<!--      min-height: 150px;-->
<!--      position: relative;-->
<!--      background-color: #f0f2f6;-->

<!--      .image-slot {-->
<!--        top: 50%;-->
<!--        left: 50%;-->
<!--        color: #b5b5b5;-->
<!--        font-size: 30px;-->
<!--        position: absolute;-->
<!--        transform: translate(-50%, -50%);-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  &-div {-->
<!--    padding: 16px;-->
<!--  }-->
<!--}-->

<!--.template-top {-->
<!--  width: 100%;-->
<!--  display: flex;-->
<!--  margin-top: 32px;-->
<!--  margin-bottom: 10px;-->

<!--  /deep/-->
<!--  .el {-->
<!--    &-button {-->
<!--      width: calc(50% - 10px);-->

<!--      & + .el-button {-->
<!--        margin-left: auto;-->
<!--      }-->
<!--    }-->

<!--    &-icon-receiving {-->
<!--      font-size: 50px;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.template-filter {-->
<!--  width: 100%;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->

<!--  /deep/-->
<!--  .el-checkbox {-->
<!--    margin: 0;-->
<!--    width: 100%;-->
<!--    height: 30px;-->
<!--    font-weight: 400;-->
<!--    text-align: left;-->
<!--    line-height: 30px;-->
<!--    padding-left: 40px;-->

<!--    &:hover {-->
<!--      color: #FF86B2;-->
<!--      background-color: rgba(255, 134, 178, 0.2);-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.template-menu {-->
<!--  height: 35px;-->
<!--  margin: 5px 0;-->
<!--  color: #2c3e50;-->
<!--  cursor: pointer;-->
<!--  font-weight: 500;-->
<!--  text-align: left;-->
<!--  line-height: 35px;-->
<!--  position: relative;-->
<!--  padding: 0 4px 0 32px;-->

<!--  &::before {-->
<!--    top: 0;-->
<!--    right: 0;-->
<!--    width: 3px;-->
<!--    content: '';-->
<!--    height: 100%;-->
<!--    position: absolute;-->
<!--    transform: rotateX(90deg);-->
<!--    transition: transform .2s;-->
<!--    background-color: #ff86b2;-->
<!--  }-->

<!--  &-nav {-->
<!--    margin: 0;-->
<!--    color: #888;-->
<!--    font-weight: 400;-->
<!--    padding-left: 25px;-->
<!--  }-->

<!--  &-active {-->
<!--    color: #ff86b2;-->
<!--    background-color: rgba(255, 134, 178, 0.2);-->

<!--    &::before {-->
<!--      transform: rotateX(0deg);-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
