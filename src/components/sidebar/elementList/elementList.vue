<template>
  <el-tree
      draggable
      ref="tree"
      node-key="id"
      :data="[tree]"
      default-expand-all
      :props="defaultProps"
      @node-click="nodeClick"
      @node-contextmenu="treeMousedown"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"/>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "sidebar-elementList",
  data: () => ({
    // tree: null,
    defaultProps: {
      children: 'childNodes',
      label: 'nodeName'
    }
  }),
  computed: {
    ...mapGetters('Blive', {
      "tree": "getHtml",
    })
  },
  mounted() {
  },
  methods: {
    treeMousedown(event, data, node, tree) {
      console.log(event, data, node, tree)
      event.preventDefault();
    },
    nodeClick(node) {
      this.$store.commit('Blive/setClick', node)
    },
    handleDragStart(node, ev) {
      console.log('drag start', node, ev);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label, ev);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label, ev);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label, ev);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType, ev);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType, ev);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    }
  }
}
</script>
