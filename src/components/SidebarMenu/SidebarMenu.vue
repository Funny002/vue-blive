<template>
  <div class="sidebarMenu">
    <template v-for="(item,key) in SidebarMenu" :key="key">
      <div v-if="item.type==='line'" class="sidebarMenu-line"/>
      <div v-else class="sidebarMenu-item">
        <fa-icon class="xxxx" :name="item.icon"/>
        <div class="sidebarMenu-item-tips">{{ item.title }}</div>
      </div>
    </template>
  </div>
</template>

<!-- script -->
<script lang="ts">
import {reactive, toRefs} from 'vue'
import FaIcon from "@/PlugIn/FaIcon.vue";

// 自动挂载？
function authMount(mountList: string[] = []): string[] {
  const getPath = (path: string) => ('./module/' + path.replace(/.\//, ''))
  // 获取文件路径
  require.context('./module', true, /^.\/[\w]+(\/index)?.vue$/).keys().forEach((path: string) => mountList.push(getPath(path)))
  return mountList
}

export default {
  name: "SidebarMenu",
  components: {FaIcon},
  setup() {
    const data = reactive({
      SidebarMenu: [{icon: "home", title: 'home'}, {icon: "user", title: 'user'}]
    });
    console.log(authMount())
    return {...toRefs(data)};
  }
}
</script>

<!-- style -->
<style lang="scss" src="../../assets/style/SidebarMenu/index.scss"/>
