<template>
  <div class="var-collapse" :class="{'var-collapse-show':show}" @click="collapseClick">
    <div class="var-collapse-header" @click.stop="headerClick">
      <slot name="header">
        <span class="var-collapse-header-icon">
          <slot name="icon">
            <el-icon name="caret-right"/>
          </slot>
        </span>
        <span class="var-collapse-header-title">
          <slot name="title">{{ label }}</slot>
        </span>
      </slot>
    </div>
    <el-collapse-transition>
      <div v-show="show" class="var-collapse-body">
        <slot/>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "var-collapse",
  props: {
    show: Boolean,
    label: String,
  },
  data: function () {
    return {
      //
    }
  },
  methods: {
    collapseClick(event) {
      this.$emit('click', event)
    },
    headerClick(event) {
      this.$emit('headerClick', event)
    }
  }
}
</script>
<style lang="less">
@import "./collapse.less";
</style>
