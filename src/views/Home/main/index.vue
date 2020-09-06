<template>
  <div>
    asdasdadsad
    <el-divider/>
    <el-pagination
        small
        background
        :total="page.total"
        :page-size="page.pageSize"
        layout="prev, pager, next"
        :pager-count="page.pagerCount"
        :current-page.sync="page.currentPage"
    />
  </div>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      page: {
        total: 60, // 总共
        pageSize: 6, // 每页多数据
        pagerCount: 5, // 按钮显示数量
        currentPage: 1, // 当前分页
      }
    }
  }
}
</script>
