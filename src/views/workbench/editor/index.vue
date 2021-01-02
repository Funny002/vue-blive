<template>
  <div class="WorkbenchEditor">
    <h3>WorkbenchEditor</h3>
    <router-link to="/workbench/view">WorkbenchView</router-link>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class WorkbenchEditor extends Vue {
  @Prop() uuid?: string

  hasUUID(uuid: string): boolean {
    // 通过 vuex 查询缓存是否存在 ？
    console.log('hasUUID :>>', uuid)
    return true
  }

  onViewJump() {
    const viewJump = (uuid?: string) => this.$router.push({path: "/workbench/view" + (uuid || '')})
    // 获取当前路径解析出来的uuid
    const uuid = this.uuid || false
    // 页面展示逻辑
    if (uuid) {
      const state = this.$utils.history.hasHistory(uuid)
      if (state) {
        const template = this.$utils.history.getHistory(uuid)
        console.log(template) //
      } else {
        viewJump('/' + uuid)
      }
    } else {
      viewJump()
    }
  }

  mounted() {
    this.onViewJump()
  }
}
</script>