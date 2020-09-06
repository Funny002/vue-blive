<template>
  <div class="view">
    <div class="view-tips">
      <h2 class="view-tips-title">
        <i18n path="tips.title">
          <el-icon place="icon" name="files"/>
        </i18n>
      </h2>
      <h3>{{ $t('tips.msg') }}</h3>
    </div>
    <div class="view-card">
      <el-card v-for="(item,key) in card.list" :key="key" shadow="hover">
        <div class="view-card-list">
          <el-icon class="view-card-icon" :name="item.icon"/>
          <h2 class="view-card-title">{{ $t(item.lang.title) }}</h2>
          <span class="view-card-msg">{{ $t(item.lang.msg) }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "workbench-view",
  data: function () {
    return {
      card: {
        list: [
          {lang: {title: "card.edit", msg: "msg.edit"}, icon: "edit-outline"},
          {lang: {title: "card.add", msg: "msg.add"}, icon: "document-add"},
          {lang: {title: "card.archive", msg: "msg.archive"}, icon: "receiving"},
          {lang: {title: "card.transport", msg: "msg.transport"}, icon: "sort"},
        ]
      }
    }
  },
  methods: {
    //
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('menuShow', false)
    })
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

<i18n src="./lang.json"/>
