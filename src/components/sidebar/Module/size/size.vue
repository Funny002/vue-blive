<template>
  <div class="sidebar-size">
    <div class="sidebar-size-list" v-for="(item,key) in size" :key="key">
      <el-tooltip :content="item.content">
        <span class="sidebar-size-list-title">{{ item.title }}</span>
      </el-tooltip>
      <el-input class="sidebar-size-list-input" :placeholder="item.val" size="mini" v-model="item.val" @blur="inputBlur(item,key)" :disabled="!dom">
        <el-select class="sidebar-size-list-select" slot="append" v-model="item.unit" @change="inputBlur(item,key)">
          <el-option v-for="(item,key) in unit" :key="key" :label="item" :value="item"/>
        </el-select>
      </el-input>
    </div>
    <span style="width: 90%; border-top: 1px solid #ddd; margin: 16px auto;"/>
    <div style="width: 100%;"></div>
  </div>
</template>

<script>
export default {
  name: "sidebar-size",
  data: function () {
    return {
      dom: null,
      size: [
        {val: '-', name: "width", title: "宽", unit: 'px', content: "元素宽"},
        {val: '-', name: "height", title: "高", unit: 'px', content: "元素高"},
        {val: '-', name: "min-width", title: "最小宽", unit: 'px', content: "元素最小宽"},
        {val: '-', name: "min-height", title: "最小高", unit: 'px', content: "元素最小高"},
        {val: '-', name: "max-width", title: "最大宽", unit: 'px', content: "元素最大宽"},
        {val: '-', name: "max-height", title: "最大高", unit: 'px', content: "元素最大高"},
      ],
      unit: ['%', 'px', 'vh', 'vw', 'auto'],
    }
  },
  mounted() {
    this.dom = this.$store.getters['Blive/getClick'];
    this.dom && this.size.find(item => {
      const value = this.dom.style[item.name]
      if (value !== '') {
        const [_, val, unit] = value.split(/^([\d]+)/)
        Object.assign(item, {val, unit}, _)
      }
    })
    console.log(this.dom && this.dom.style)
  },
  methods: {
    inputBlur(value, key) {
      const {val, name, unit} = value
      if (!val.match(/[\d]+/)) {
        Object.assign(this.size[key], {val: "-", unit: "px"})
        return false
      }
      this.dom.style[name] = val + unit
      // console.log(JSON.stringify(value))
    }
  }
}
</script>

<style scoped lang="less">
.sidebar-size {
  display: flex;
  flex-wrap: wrap;

  &-list {
    width: 50%;
    display: flex;
    margin-top: 5px;
    align-items: center;
    justify-content: flex-end;

    &-title {
      font-size: 14px;
      padding-right: 5px;
    }

    &-input {
      width: 80px;

      /deep/
      .el-input {
        &__inner {
          padding: 0 5px;
        }

        &-group__append {
          padding: 0 15px;
        }
      }
    }

    &-select {
      width: 20px;

      /deep/
      .el-input {
        &__inner {
          padding: 0;
          text-align: center;
        }

        &__suffix {
          display: none;
        }
      }
    }
  }
}
</style>
