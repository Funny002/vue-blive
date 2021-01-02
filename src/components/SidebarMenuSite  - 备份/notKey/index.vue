<!--<template>-->
<!--  <div class="site-notKey">-->
<!--    &lt;!&ndash;    <el-divider content-position="left"><h3>{{ $t('notKey') }}</h3></el-divider>&ndash;&gt;-->

<!--    &lt;!&ndash;    <div class="card-notKey">&ndash;&gt;-->
<!--    &lt;!&ndash;      <el-card v-for="card in notKey.list" :key="card.title">&ndash;&gt;-->
<!--    &lt;!&ndash;        <div slot="header">&ndash;&gt;-->
<!--    &lt;!&ndash;          <h3 style="text-align: left;">{{ $t('card.' + card.title) }}</h3>&ndash;&gt;-->
<!--    &lt;!&ndash;        </div>&ndash;&gt;-->
<!--    &lt;!&ndash;        <div class="card-notKey-list" v-for="(item,key) in card.value" :key="key">&ndash;&gt;-->
<!--    &lt;!&ndash;          <div class="card-notKey-title">{{ $t('card.' + item.title) }}</div>&ndash;&gt;-->
<!--    &lt;!&ndash;          <span style="margin: auto;"/>&ndash;&gt;-->
<!--    &lt;!&ndash;          <div class="card-notKey-key">&ndash;&gt;-->
<!--    &lt;!&ndash;            <div v-for="notKey of item.key" :key="notKey">&ndash;&gt;-->
<!--    &lt;!&ndash;              <el-tag v-if="notKey === 'wheel'">鼠标滚轮</el-tag>&ndash;&gt;-->
<!--    &lt;!&ndash;              <el-tag v-if="notKey === 'alt'">alt</el-tag>&ndash;&gt;-->
<!--    &lt;!&ndash;              <el-tag v-if="notKey === 'shift'">shift</el-tag>&ndash;&gt;-->
<!--    &lt;!&ndash;              <el-tag v-if="notKey === 's'">s</el-tag>&ndash;&gt;-->
<!--    &lt;!&ndash;            </div>&ndash;&gt;-->
<!--    &lt;!&ndash;          </div>&ndash;&gt;-->
<!--    &lt;!&ndash;        </div>&ndash;&gt;-->
<!--    &lt;!&ndash;      </el-card>&ndash;&gt;-->
<!--    &lt;!&ndash;    </div>&ndash;&gt;-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: "site-notKey",-->
<!--  data: function () {-->
<!--    return {-->
<!--      notKey: {-->
<!--        list: [{-->
<!--          title: "preview",-->
<!--          value: [-->
<!--            {title: "save", key: ['alt', 'shift', 's']}-->
<!--          ]-->
<!--        }, {-->
<!--          title: "workbench",-->
<!--          value: [-->
<!--            {title: "axisX", key: ['shift', 'wheel']},-->
<!--            {title: "axisY", key: ['alt', 'wheel']},-->
<!--            {title: "zoom", key: ['wheel']}-->
<!--          ]-->
<!--        }, {-->
<!--          title: "selector",-->
<!--          value: [-->
<!--            {title: "axisX", key: ['shift', 'wheel']},-->
<!--            {title: "axisY", key: ['alt', 'wheel']},-->
<!--            {title: "zoom", key: ['wheel']}-->
<!--          ]-->
<!--        }]-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.$nextTick(() => {-->
<!--      const menuData = [-->
<!--        {isMenu: false, name: 'notKey', title: '快捷键'},-->
<!--      ]-->
<!--      this.$emit('menuCallback', menuData)-->
<!--    })-->
<!--  }-->
<!--}-->
<!--</script>-->
