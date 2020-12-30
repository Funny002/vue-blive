<template>
  <span>
    <i class="fa fa-fw" :class="['fa-'+name,iconClass]"/>
  </span>
</template>

<!-- script -->
<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class FaIcon extends Vue {
  @Prop() name?: string;
  @Prop() iconClass?: string;
}
</script>
