<template>
  <span>
    <i class="fa fa-fw" :class="['fa-'+name,iconClass]"/>
  </span>
</template>

<!-- script -->
<script>
export default {
  name: "FaIcon",
  props: {name: String, iconClass: String}
}
</script>
