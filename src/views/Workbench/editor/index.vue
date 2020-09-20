<template>
  <div class="workbench-editor">
    <workbench-view-code/>
    <workbench-sidebar/>
    <workbench-ruler>
      <div class="Blive" ref="BLive" :style="{'top':mobile.left+'px','left':mobile.top+'px'}" @mouseout.stop @mousedown.stop @click.stop @mouseup.stop>
        <span class="Blive-right" disabled><el-icon name="more"/></span>
        <span class="Blive-bottom" disabled><el-icon name="more"/></span>
      </div>
    </workbench-ruler>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Ruler from "@/components/Ruler/Ruler";
import Sidebar from '@/components/sidebar/sidebar'
import viewCode from "@/components/viewCode/viewCode";
import {changeHtml, changeJson} from '@/utils/change.js';
import {addHistory, getHistory} from '@/utils/history.js';

export default {
  name: "workbench-editor",
  components: {
    'workbench-ruler': Ruler,
    'workbench-sidebar': Sidebar,
    'workbench-view-code': viewCode
  },
  props: ['uuid'],
  computed: {
    ...mapGetters('History', {"Callback": "getIni", 'getView': 'getView', 'authSave': 'getAuthSave'}),
    ...mapGetters('Blive', {'domClick': 'getClick'}),
    ...mapGetters('Ruler', {'mobile': 'getMobile'}),
  },
  watch: {
    domClick(value) {
      console.log(value)
    },
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
        const html = changeHtml(bliveTemplate.value)
        // 添加到vuex
        this.$store.commit('Blive/setHtml', html)
        // 加载进入模板
        this.$refs.BLive.appendChild(html)
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
<style lang="less" scoped>
@import "./index.less";
</style>
