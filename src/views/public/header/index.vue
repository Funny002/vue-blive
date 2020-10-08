<template>
  <header class="PublicHeader" :class="className">
    PublicHeader
  </header>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  props: {
    className: [Array, Object, String]
  }
})
export default class PublicHeader extends Vue {
}
</script>
