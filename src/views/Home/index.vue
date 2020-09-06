<template>
  <el-container id="App">
    <el-header id="header">
      <var-header/>
    </el-header>
    <el-container id="container">
      <el-container id="body">
        <el-main id="main">
          <el-card id="main-card">
            <router-view/>
          </el-card>
        </el-main>
        <el-aside id="aside">
          <var-aside/>
        </el-aside>
      </el-container>
      <el-footer id="footer">
        <var-footer/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./header/index";
import Footer from "./footer/index";
import Aside from "./aside/index";

export default {
  components: {
    'var-aside': Aside,
    'var-footer': Footer,
    'var-header': Header
  },
  name: "Home",
}
</script>

<style lang="less">
@import "./index.less";
</style>
