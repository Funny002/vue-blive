<template>
  <div id="App" class="blog">
    <blog-header/>
    <div class="blog-container">
      <main class="blog-main">
        <router-view/>
      </main>
      <blog-footer/>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import BlogFooter from "@/views/Blog/frame/footer/index.vue";
import BlogHeader from "@/views/Blog/frame/header/index.vue";

@Component({
  components: {
    BlogHeader,
    BlogFooter,
  }
})
export default class Frame extends Vue {
  //
}
</script>

<style scoped lang="scss">

.blog {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  flex-direction: column;
}

.blog-container {
  width: 100%;
  display: flex;
  flex: 1 1 auto;
  overflow-y: auto;
  flex-direction: column;
}

.blog-main {
  width: 100%;
  flex: 1 1 auto;
}
</style>
