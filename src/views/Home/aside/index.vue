<template>
  <div class="aside">
    <el-tabs>
      <el-tab-pane :label="$t('aboutMe')">
        关于我
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "aside"
}
</script>

<i18n src="./lang.json"/>
