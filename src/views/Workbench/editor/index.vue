<template>
  <Ruler>
    <div class="Blive" ref="BLive" v-html="bliveTemplate"/>
  </Ruler>
</template>

<script>
import Ruler from "@/components/Ruler/Ruler";
import history from '@/utils/history.js'

export default {
  name: "workbench-editor",
  components: {Ruler},
  props: ['uuid'],
  data: function () {
    return {
      bliveTemplate: null,
    }
  },
  methods: {
    init() {
      // 从缓存中获取模板
      const bliveTemplate = history.getHistory(this.uuid)
      if (bliveTemplate) {
        console.log(bliveTemplate)
      } else {
        this.$router.push({path: "/workbench/index/error"})
      }
      // console.log(this.uuid.match(/^\w{5}-\w{4}-\w{3}-\w{5}$/))
    }
  },
  mounted() {
    !this.uuid && this.$router.push('/workbench')
    this.$nextTick(() => {
      this.$emit('menuShow', true)
      setTimeout(() => this.init())
    })
  }
}
</script>
