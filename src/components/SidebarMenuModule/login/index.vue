<template>
  <div v-show="show">
    <div class="SidebarMenuLogin" :class="{'SidebarMenuLogin__up':stateSwitch}">
      <div class="SidebarMenuLogin-body">
        <el-form class="SidebarMenuLogin-in" :model="signUp">
          <div class="SidebarMenuLogin-title">注册</div>
          <el-form-item prop="user" :rules="formRules.user">
            <el-input v-model="signUp.user" placeholder="账号" clearable>
              <fa-icon slot="prefix" name="user" style="line-height: 32px;"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass" :rules="formRules.pass">
            <el-input v-model="signUp.pass" placeholder="密码" clearable>
              <fa-icon slot="prefix" name="lock" style="line-height: 32px;"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="code" :rules="formRules.code">
            <el-input v-model="signUp.code" placeholder="验证码" clearable>
              <fa-icon slot="prefix" name="barcode" style="line-height: 32px;"/>
            </el-input>
          </el-form-item>
          <el-button>注册</el-button>
        </el-form>
        <el-form class="SidebarMenuLogin-up" :model="signIn">
          <div class="SidebarMenuLogin-title">登录</div>
          <el-form-item prop="user" :rules="formRules.user">
            <el-input v-model="signIn.user" placeholder="账号" clearable>
              <fa-icon slot="prefix" name="user" style="line-height: 32px;"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="pass" :rules="formRules.pass">
            <el-input v-model="signIn.pass" placeholder="密码" clearable>
              <fa-icon slot="prefix" name="lock" style="line-height: 32px;"/>
            </el-input>
          </el-form-item>
          <el-form-item prop="code" :rules="formRules.code">
            <el-input v-model="signIn.code" placeholder="验证码" clearable>
              <fa-icon slot="prefix" name="barcode" style="line-height: 32px;"/>
            </el-input>
          </el-form-item>
          <el-button>登录</el-button>
        </el-form>
      </div>
      <div class="SidebarMenuLogin-nav">
        <div class="SidebarMenuLogin-nav-body">
          <div class="SidebarMenuLogin-nav-up">
            <div class="SidebarMenuLogin-nav-title">没有帐号？</div>
            <div class="SidebarMenuLogin-nav-text">立即注册加入我们</div>
            <div class="SidebarMenuLogin-nav-btn" @click="stateSwitch=true">注册</div>
          </div>
          <div class="SidebarMenuLogin-nav-in">
            <div class="SidebarMenuLogin-nav-title">已有帐号？</div>
            <div class="SidebarMenuLogin-nav-text">请使用您的帐号进行登录</div>
            <div class="SidebarMenuLogin-nav-btn" @click="stateSwitch=false">登录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="SidebarMenuLogin-coverInto" @click="onClose"/>
  </div>
</template>

<!-- script -->
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class SidebarMenuLogin extends Vue {
  show = false;
  stateSwitch = false;
  verifyMaxOrMin = this.$utils.verifyRules.verifyMaxOrMin;
  signUp: { [key: string]: string } = {user: "", pass: "", code: ""};
  signIn: { [key: string]: string } = {user: "", pass: "", code: ""};
  formRules = {
    user: {required: true, min: 4, validator: this.verifyMaxOrMin, trigger: "change"},
    pass: {required: true, min: 6, validator: this.verifyMaxOrMin, trigger: "change"},
    code: {required: true, min: 4, max: 5, validator: this.verifyMaxOrMin, trigger: "change"}
  };

  onInit() {
    this.show = true
  }

  onClose() {
    this.show = false
    this.stateSwitch = false
  }
}
</script>

<!-- style -->
<style lang="scss" src="./SidebarMenuLogin.scss"/>