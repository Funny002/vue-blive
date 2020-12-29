<template>
  <div class="Login">Login</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {MenuItem} from '@/components/SidebarMenu/verifyRules'

@Component
export default class SidebarMenuLogin extends Vue {
  // 创建
  created() {
    const callBack: MenuItem = {
      icon: 'user',
      name: this.$options.name
    }
    this.$emit('callBack', callBack)
  }
}
</script>