<template>
  <div>index
    <el-date-picker></el-date-picker>
    <lang-module/>
  </div>
</template>

<script>
import langModule from '@/components/Lang'

export default {
  components: {langModule},
  name: "index",
}
</script>
