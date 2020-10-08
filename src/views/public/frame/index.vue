<template>
  <div id="App" class="publicFrame" :class="frameClass">
    <slot name="header">
      <Public-footer :class-name="headerClass"/>
    </slot>
    <div class="publicContainer" :class="containerClass">
      <slot>
        <main class="publicMain" :class="mainClass">
          <router-view/>
        </main>
      </slot>
      <slot name="footer">
        <Public-footer :class-name="footerClass"/>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import PublicFooter from "@/views/public/footer/index.vue";

@Component({
  props: {
    mainClass: [Array, Object, String],
    frameClass: [Array, Object, String],
    footerClass: [Array, Object, String],
    headerClass: [Array, Object, String],
    containerClass: [Array, Object, String],
  },
  components: {PublicFooter}
})
export default class PublicFrame extends Vue {
  //
}
</script>
<style scoped lang="scss">
.public {
  &Frame {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &Header {
    width: 100%;
    height: 60px;
  }

  &Container {
    width: 100%;
    flex: 1 1 auto;
    overflow-y: auto;
  }
}
</style>
