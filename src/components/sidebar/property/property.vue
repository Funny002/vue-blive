<template>
  <div class="sidebar-property">
    <el-button-group class="sidebar-property-list">
      <el-button type="primary" v-for="(item,key) in btn.list" :key="key" :plain="btn.key !== key" @click="btnListClick(key)">
        <el-icon :name="item"/>
      </el-button>
    </el-button-group>
    <div class="sidebar-property-body">
      <div v-if="btn.key === 0">
        <var-collapse
            :key="key"
            :show="item.show"
            :label="item.label"
            @headerClick="headerClick(key)"
            v-for="(item,key) in collapseList"
        >
          <component :is="item.component"/>
        </var-collapse>
      </div>
      <div v-else-if="btn.key === 1"></div>
      <div v-else-if="btn.key === 2"></div>
    </div>
  </div>
</template>

<script>
import Box from '../Module/Box/Box'
import Size from '../Module/size/size'
import collapse from "@/components/collapse/collapse";

export default {
  name: "sidebar-property",
  components: {'var-collapse': collapse},
  data: function () {
    return {
      btn: {
        key: 0,
        list: ['s-operation', 'news', 'more-outline']
      },
      collapseList: [
        {label: "尺寸", show: true, component: Size},
        {label: "布局", show: true, component: null},
        {label: "布局", show: true, component: null},
        {label: "Box模型", show: true, component: Box},
      ]
    }
  },

  mounted() {
    // this.dom = this.$store.getters['Blive/getClick'];
    // console.log(this.dom.attributes)
  },
  methods: {
    btnListClick(key) {
      if (this.btn.key !== key) {
        this.btn.key = key
      }
    },
    headerClick(key) {
      this.collapseList[key].show = !this.collapseList[key].show
    }
  }
}
</script>
<style lang="less">
@import "./property.less";
</style>
