<template>
  <div class="LayoutContainer">
    <slot/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class LayoutContainer extends Vue {
  //
}
</script>