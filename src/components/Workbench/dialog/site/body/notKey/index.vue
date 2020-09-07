<template>
  <div class="site-notKey">
    <el-divider content-position="left"><h3>{{ $t('notKey') }}</h3></el-divider>

    <div class="card-notKey">
      <el-card v-for="card in notKey.list" :key="card.title">
        <div slot="header">
          <h3 style="text-align: left;">{{ $t('card.' + card.title) }}</h3>
        </div>
        <div class="card-notKey-list" v-for="(item,key) in card.value" :key="key">
          <div class="card-notKey-title">{{ $t('card.' + item.title) }}</div>
          <div class="card-notKey-key">
            <div v-for="notKey of item.key" :key="notKey">
              <el-tag v-if="notKey === 'wheel'">{{ $t('wheel') }}</el-tag>
              <el-tag v-if="notKey === 'alt'">alt</el-tag>
              <el-tag v-if="notKey === 'shift'">shift</el-tag>
              <el-tag v-if="notKey === 's'">s</el-tag>
            </div>
          </div>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>

export default {
  name: "site-notKey",
  data: function () {
    return {
      notKey: {
        list: [{
          title: "preview",
          value: [
            {title: "save", key: ['alt', 'shift', 's']}
          ]
        }, {
          title: "workbench",
          value: [
            {title: "axisX", key: ['shift', 'wheel']},
            {title: "axisY", key: ['alt', 'wheel']},
            {title: "zoom", key: ['wheel']}
          ]
        }, {
          title: "selector",
          value: [
            {title: "axisX", key: ['shift', 'wheel']},
            {title: "axisY", key: ['alt', 'wheel']},
            {title: "zoom", key: ['wheel']}
          ]
        }]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: false, name: 'notKey', lang: 'notKey'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
</script>

<i18n src="./lang.json"/>
