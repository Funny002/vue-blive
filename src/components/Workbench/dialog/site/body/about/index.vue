<template>
  <div class="site-about">
    <el-divider content-position="left"><h3>{{ $t('about') }}</h3></el-divider>

    <div style="text-align: left;">
      <span>{{$t('tips')}}</span>
      <div style="margin-top: 10px;">
        <el-button size="medium" v-for="item in tipsList" :key="item.lang" @click="routerPush(item.path)">{{ $t(item.lang) }}</el-button>
      </div>
    </div>

    <el-divider content-position="left"><h3>{{ $t('contributor') }}</h3></el-divider>

    <div style="text-align: left">
      <span style="display: block;">{{ $t('statement.msg_1') }}</span>
      <span style="display: block;">{{ $t('statement.msg_2') }}</span>
    </div>

    <el-table style="margin: 10px 0;" :data="devoteUserList">
      <el-table-column :label="$t('table.avatar')" width="80px" align="center">
        <template slot-scope="scope">
          <el-avatar style="display: block; margin: auto;" :src="scope.row.avatar">{{ scope.row.name[0] }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.name')" prop="name"/>
      <el-table-column :label="$t('table.devote')" prop="devote"/>
      <el-table-column :label="$t('table.contact')" prop="contact">
        <template slot-scope="scope">
          <span>{{ scope.row.contact ? scope.row.contact : $t('table.contactText') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <span style="text-align: left; display: block;">{{ $t('table.footer') }}</span>

  </div>
</template>

<script>

export default {
  name: "site-about",
  data: function () {
    return {
      devoteUserList: [
        {avatar: "asdasda", name: "ReFunny", devote: "维护人员", contact: "2053423015@qq.com",}
      ],
      tipsList: [
        {lang: "devote", path: ""},
        {lang: "tutorials", path: ""},
        {lang: "sponsor", path: ""},
      ]
    }
  },
  methods: {
    routerPush() {
    }
  },
  mounted() {
    this.$nextTick(() => {
      const menuData = [
        {isMenu: true, lang: 'other'},
        {isMenu: false, name: 'about', lang: 'about'},
      ]
      this.$emit('menuCallback', menuData)
    })
  }
}
</script>

<i18n src="./lang.json"/>
