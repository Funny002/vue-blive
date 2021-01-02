<template>
  <div class="WorkbenchView">
    <template v-if="!error">
      <div class="WorkbenchView__btn">
        <div class="WorkbenchView__btn-list" v-for="(item,key) in MenuBtnLIst" :key="key" @click="onClick(item.name)">
          <fa-icon class="WorkbenchView__btn-list-icon" :name="item.icon"/>
          <h3 class="WorkbenchView__btn-list-title">{{ item.label }}</h3>
          <div class="WorkbenchView__btn-list-text">{{ item.tipsText }}</div>
        </div>
      </div>
      <div class="WorkbenchView__copyright">
        <p>{{ getCopyright }}</p>
        <p>{{ getVersion }} </p>
      </div>
    </template>
    <template v-else>
      <div class="WorkbenchView__error">
        <div class="WorkbenchView__error-image">
          <img src="../../../assets/image/original.png" alt="original"/>
        </div>
        <div class="WorkbenchView__error-text">抱歉, 系统无法读取简介UUID, 它可能已经不存在了。</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {MenuBtnItem} from '../verifyRules'
import {Getter, Mutation} from 'vuex-class'

@Component
export default class WorkbenchView extends Vue {
  @Prop() error?: string; // 是否错误
  @Getter('getVersion') getVersion: string; // 版本
  @Getter('getCopyright') getCopyright: string; // 版权
  @Mutation('SidebarMenu/setOpenName') setOpenName

  /* 菜单 */
  MenuBtnLIst: MenuBtnItem[] = [
    {icon: "edit", name: "new", label: "创建空白文件", tipsText: "没有任何内容，需要了解使用方法"},
    {icon: "file-code-o", name: "file", label: "导入文件", tipsText: "导入本地文件进行解析"},
    {icon: "history", name: "history", label: "加载存档", tipsText: "导入存档缓存文件"},
    {icon: "cloud-download", name: "cloud", label: "远程获取", tipsText: "通过网络获取文件解析"},
  ]

  funcNew() {
    // 创建空模板 ~ 跳转到工作台
    const uuid = this.$utils.template.createTemplate()
    //
    this.$router.push({path: "/workbench/editor/" + uuid})
  }

  funcFile() {
    this.$message.warning('功能正在施工中......')
    // 导入
  }

  funcCloud() {
    this.$message.warning('功能正在施工中......')
    // 云端导入
  }

  funcHistory() {
    // this.$message.warning('功能正在施工中......')
    this.setOpenName('SidebarMenuModuleHistory')
    // 打开缓存窗口
  }

  onClick(name: string) {
    const func = {
      new: () => this.funcNew(),
      file: () => this.funcFile(),
      cloud: () => this.funcCloud(),
      history: () => this.funcHistory(),
    } as { [key: string]: (() => void) }
    //
    if (Object.hasOwnProperty.call(func, name)) func[name]()
  }
}
</script>
