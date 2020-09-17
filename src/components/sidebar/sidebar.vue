<template>
  <div class="workbench-sidebar">
    <span
        :key="key"
        v-for="(item,key) in menu"
        @click="menuClick(item.name)"
        class="workbench-sidebar-btn"
        :class="{'btn-block' :menuKey===item.name}"
    >{{ $t(item.lang) }}</span>
    <div v-if="menuKey" class="workbench-sidebar-component">
      <sidebar-property v-if="menuKey === 'property' "/>
      <sidebar-element-list v-if="menuKey === 'elementList' "/>
    </div>
  </div>
</template>

<script>
import Property from "@/components/sidebar/property/property";
import ElementList from "@/components/sidebar/elementList/elementList";

export default {
  name: "workbench-sidebar",
  components: {
    'sidebar-property': Property,
    'sidebar-element-list': ElementList,
  },
  data: function () {
    return {
      menuKey: 'property',
      menu: [
        {lang: "property", name: "property"},
        {lang: "elementList", name: "elementList"},
      ]
    }
  },
  methods: {
    menuClick(name) {
      if (this.menuKey === name) {
        this.menuKey = null
      } else {
        this.menuKey = name
      }
    }
  }
}
</script>

<style lang="less">
@import "./sidebar.less";
</style>

<i18n src="./lang.json"/>
