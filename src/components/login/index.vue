<template>
  <div class="sign" :class="classes" @click.stop="$emit('window-close')">
    <div class="sign-body" :class="{'sign-upShow':upShow}" @click.stop>

      <div class="sign-up">
        <span class="sign-title">注册</span>
        <el-input v-model="user" placeholder="账号" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user-solid"/>
        </el-input>
        <el-input v-model="user" placeholder="密码" clearable>
          <i slot="prefix" class="el-input__icon el-icon-lock"/>
        </el-input>
        <el-input v-model="user" placeholder="验证码" clearable>
          <i slot="prefix" class="el-input__icon el-icon-s-grid"/>
        </el-input>
        <el-input v-model="user" placeholder="扩展码" clearable>
          <i slot="prefix" class="el-input__icon el-icon-key"/>
        </el-input>
        <el-button style="width: 100%; margin-top: 10px;"  type="primary">注册</el-button>
      </div>

      <div class="sign-in">
        <span class="sign-title">登录</span>
        <el-input v-model="user" placeholder="账号" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user-solid"/>
        </el-input>
        <el-input v-model="user" placeholder="密码" clearable>
          <i slot="prefix" class="el-input__icon el-icon-lock"/>
        </el-input>
        <el-input v-model="user" placeholder="验证码" clearable>
          <i slot="prefix" class="el-input__icon el-icon-s-grid"/>
        </el-input>
        <div style="display: flex; align-items: center; margin-top: 10px;">
          <el-checkbox>记住密码</el-checkbox>
          <el-button style="margin-left: auto; width: 100px;" type="primary" icon="el-icon-s-promotion">登录</el-button>
        </div>
      </div>

      <div class="sign-nav">
        <div class="sign-nav-body">
          <div class="sign-nav-in">
            <span class="sign-nav-title">已有帐号？</span>
            <span class="sign-nav-text">请使用您的帐号进行登录</span>
            <span class="sign-nav-btn" @click="upShow = false">登录</span>
          </div>
          <div class="sign-nav-up">
            <span class="sign-nav-title">没有帐号？</span>
            <span class="sign-nav-text">立即注册加入我们</span>
            <span class="sign-nav-btn" @click="upShow = true">注册</span>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="">login</div>-->
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

@Component
export default class Login extends Vue {
  signNext = false;
  user = ''

  get classes() {
    return {
      'sign-show': this.show,
      'sign-next': this.signNext
    }
  }

  //
  @Prop({default: false}) show?: boolean;

  @Watch('show') getShow(bool: boolean) {
    console.log(bool)
    if (bool) {
      setTimeout(() => {
        this.signNext = true
      })
    } else {
      this.signNext = false
    }
  }

  signShow = false
  upShow = false
}
</script>
<style scoped lang="scss">
@import "./style.scss";
</style>
