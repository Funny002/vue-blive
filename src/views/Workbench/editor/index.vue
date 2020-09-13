<template>
  <Ruler>
    <div class="Blive" ref="BLive" v-html="bliveTemplate"/>
  </Ruler>
</template>

<script>
import {mapGetters} from "vuex";
import Ruler from "@/components/Ruler/Ruler";
import {changeHtml} from '@/utils/change.js';
import {getHistory} from '@/utils/history.js';

export default {
  name: "workbench-editor",
  components: {Ruler},
  props: ['uuid'],
  data: function () {
    return {
      bliveTemplate: null,
    }
  },
  computed: {
    ...mapGetters('History', {"Callback": "getIni", 'getView': 'getView', 'authSave': 'getAuthSave'})
  },
  watch: {
    getView() {
      // 收到通知，重新初始化内容
      // this.init()
    },
    Callback(value) {
      console.log(value)
    }
  },
  methods: {
    init() {
      // 获取缓存
      const bliveTemplate = getHistory(this.uuid)
      // 没有缓存就跳转错误页面
      !bliveTemplate && this.$router.push({path: "/workbench/index/error"})
      // 解析 json 加载 HTML
      this.$refs.BLive.appendChild(changeHtml(bliveTemplate))
      //
      console.log(this.bliveTemplate)
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
