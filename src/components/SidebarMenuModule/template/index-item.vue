<template>
  <div class="MenuTemplateItem">
    <el-divider class="MenuTemplateItem__divider">
      <h2 class="MenuTemplateItem__divider-title">{{ divider.label }}</h2>
      <div class="MenuTemplateItem__divider-text">{{ divider.text }}</div>
    </el-divider>

    <div class="MenuTemplateItem__list">
      <!-- 预留位，后台数据转换为 12 -->
      <template v-for="(item,key) in  templateList">
        <el-card class="MenuTemplateItem__item" :key="key" @click="event=>onClick(item,event)" shadow="hover">
          <!-- 图片规定 ~ 240 * 240 1:1 -->
          <img class="MenuTemplateItem__item-image" :src="item.src" :alt="item.alt"/>
          <h3 class="MenuTemplateItem__item-title">{{ item.label }}</h3>
          <div class="MenuTemplateItem__item-tag">
            <el-tag v-for="(tag,k) in item.tag" :key="k" :type="tag.type">{{ tag.label }}</el-tag>
          </div>
        </el-card>
      </template>

    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {TemplateListItem, TemplateDivider} from './verifyRules'

@Component
export default class SidebarMenuModuleTemplateItem extends Vue {
  @Prop() divider?: TemplateDivider;
  @Prop() templateList?: TemplateListItem[];

  onClick(item: TemplateListItem, event: Event) {
    this.$emit('click', item, event)
  }
}
</script>
