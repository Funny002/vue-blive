<template>
  <footer class="blog-footer">
    <div style="display: flex; align-items: center; height: 100%; padding: 0 32px;">
      <span class="var-footer">{{ getCopyright }}</span>
    </div>
  </footer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Getter} from 'vuex-class'

@Component
export default class BlogFooter extends Vue {
  @Getter('getCopyright') getCopyright: string | undefined;
}
</script>

<style scoped lang="scss">

.blog-footer {
  width: 100%;
  color: #F0F1EF;
  min-height: 60px;
  background-color: #2C3E50;
}
</style>
