<template>
  <Ruler>
    <div class="Blive" ref="BLive"/>
  </Ruler>
</template>

<script>
import {mapGetters} from "vuex";
import Ruler from "@/components/Ruler/Ruler";
import {changeHtml, changeJson} from '@/utils/change.js';
import {getHistory} from '@/utils/history.js';

export default {
  name: "workbench-editor",
  components: {Ruler},
  props: ['uuid'],
  computed: {
    ...mapGetters('History', {"Callback": "getIni", 'getView': 'getView', 'authSave': 'getAuthSave'})
  },
  watch: {
    getView() {
      // 收到通知，重新初始化内容
      this.init()
    },
    Callback(value) {
      const bliveTemplate = changeJson(this.$refs.BLive.firstChild)
      console.log(bliveTemplate)
      console.log('Callback', value)
    }
  },
  methods: {
    init() {
      // 获取缓存
      const bliveTemplate = getHistory(this.uuid)
      if (bliveTemplate) {
        // 解析 json 加载 HTML
        this.$refs.BLive.appendChild(changeHtml(bliveTemplate.value))
      } else {
        // 没有缓存就跳转错误页面
        this.$router.push({path: "/workbench/index/error"})
      }
    },
  },
  mounted() {
    !this.uuid && this.$router.push('/workbench')
    this.$nextTick(() => {
      // 设计计时器，回一个自加载
      this.$store.commit('History/setAuthSave', this.authSave)
      // 菜单样式回调
      this.$emit('menuShow', true)
      setTimeout(() => this.init())
    })
  }
}
</script>
