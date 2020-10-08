<template>
  <footer class="publicFooter" :class="className">
    <span style="color: #fff;">{{ getCopyright }}</span>
  </footer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {Getter} from 'vuex-class'

@Component({
  props: {
    className: [Array, Object, String]
  }
})
export default class PublicFooter extends Vue {
  @Getter('getCopyright') getCopyright: string | undefined;
}
</script>

<style scoped lang="scss">
.publicFooter {
  width: 100%;
  display: flex;
  padding: 0 32px;
  min-height: 60px;
  align-items: center;
  background-color: #2C3E50;
}
</style>
