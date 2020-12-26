<template>
  <!-- 组件 -->
  <sidebar-menu></sidebar-menu>
</template>
<script lang="ts">
import {toRefs, reactive} from 'vue'
import SidebarMenu from "@/components/SidebarMenu/SidebarMenu.vue";

const app = {
  name: "views-home",
  components: {SidebarMenu},
  // components: {SidebarMenu},
  setup() {
    const data = reactive({
      //
    });
    return {...toRefs(data)}
  }
}
export default app
</script>
