<template>
  <div class="WorkbenchView">
    <h3>sWorkbenchView</h3>
    <router-link to="/workbench/editor">WorkbenchEditor</router-link>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class WorkbenchView extends Vue {
  //
}
</script>