<template>
  <div class="box-margin">
    <span class="box-title">内边距</span>
    <box-span default="0" keys="margin-left" :proof="verify.all" :value="box['margin-left']" @Callback="spanCallback"/>
    <div class="box-margin-body">
      <box-span default="0" keys="margin-top" :proof="verify.all" :value="box['margin-top']" @Callback="spanCallback"/>
      <div class="box-border">
        <span class="box-title">边框</span>
        <box-span default="0" keys="border-left" :proof="verify.all" :value="box['border-left']" @Callback="spanCallback"/>
        <div class="box-border-body">
          <box-span default="0" keys="border-top" :proof="verify.all" :value="box['border-top']" @Callback="spanCallback"/>
          <div class="box-padding">
            <span class="box-title">内边距</span>
            <box-span default="0" keys="padding-left" :proof="verify.all" :value="box['padding-left']" @Callback="spanCallback"/>
            <div class="box-padding-body">
              <box-span default="0" keys="padding-top" :proof="verify.all" :value="box['padding-top']" @Callback="spanCallback"/>
              <div class="box">
                <box-span default="auto" keys="width" :proof="verify.all" :value="box.width" @Callback="spanCallback"/>
                <span><el-icon name="close"/></span>
                <box-span default="auto" keys="height" :proof="verify.all" :value="box.height" @Callback="spanCallback"/>
              </div>
              <box-span default="0" keys="padding-bottom" :proof="verify.all" :value="box['padding-bottom']" @Callback="spanCallback"/>
            </div>
            <box-span default="0" keys="padding-right" :proof="verify.all" :value="box['padding-right']" @Callback="spanCallback"/>
          </div>
          <box-span default="0" keys="border-bottom" :proof="verify.all" :value="box['border-bottom']" @Callback="spanCallback"/>
        </div>
        <box-span default="0" keys="border-right" :proof="verify.all" :value="box['border-right']" @Callback="spanCallback"/>
      </div>
      <box-span default="0" keys="margin-right" :proof="verify.all" :value="box['margin-right']" @Callback="spanCallback"/>
    </div>
    <box-span default="0" keys="margin-bottom" :proof="verify.all" :value="box['margin-right']" @Callback="spanCallback"/>
  </div>
</template>

<script>
import BoxSpan from "@/components/sidebar/Module/Box/box-span";

export default {
  name: "sidebar-box",
  components: {BoxSpan},
  data: function () {
    return {
      timeOut: null,
      verify: {
        // 100px -100px 100 -100 auto -
        all: new RegExp(/^(-|auto|-?[\d]+(px)?)$/),
      },
      box: {
        width: "auto",
        height: "auto",
        // 内边距
        'padding-top': '-',
        'padding-left': '-',
        'padding-right': '-',
        'padding-bottom': '-',
        // 外边距
        'margin-top': '-',
        'margin-left': '-',
        'margin-right': '-',
        'margin-bottom': '-',
        // 边框
        'border-top': '-',
        'border-left': '-',
        'border-right': '-',
        'border-bottom': '-',
      },
    }
  },
  methods: {
    spanCallback(value, keys) {
      this.box[keys] = value
    }
  }
}
</script>
<style lang="less" scoped>

.box {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e2e2;

  &-title {
    top: 0;
    left: 0;
    color: #FF86B2;
    cursor: default;
    font-size: 10px;
    user-select: none;
    position: absolute;
    transform: scale(.8);
  }

  &-border,
  &-margin,
  &-padding {
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    box-sizing: border-box;
    //border: 1px dotted #aaa;
    border: 1px solid #aaa;
    justify-content: center;
    background-color: #ffeff4;

    &-body {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
