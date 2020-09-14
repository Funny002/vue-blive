<template>
  <Ruler>
    <div class="Blive" ref="BLive"/>
  </Ruler>
</template>

<script>
import {mapGetters} from "vuex";
import Ruler from "@/components/Ruler/Ruler";
import {changeHtml, changeJson} from '@/utils/change.js';
import {addHistory, getHistory} from '@/utils/history.js';

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
    Callback() {
      const bliveTemplate = changeJson(this.$refs.BLive.firstChild)
      if (bliveTemplate) {
        if (addHistory(this.uuid, changeJson(this.$refs.BLive.firstChild))) {
          this.$message({message: '保存成功', type: 'success'})
          this.$store.commit('History/setView')
        } else {
          this.$message({message: '保存失败', type: 'error'})
        }
      } else {
        this.$message({message: '获取模板失败，请联系管理员', type: 'error'})
      }
    }
  },
  methods: {
    init() {
      // 获取缓存
      const bliveTemplate = getHistory(this.uuid)
      if (bliveTemplate) {
        // 解析 json 加载 HTML
        // console.log(changeHtml(bliveTemplate.value))
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
