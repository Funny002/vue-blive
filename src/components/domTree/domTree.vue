<template>
  <el-tree
      draggable
      ref="domTree"
      node-key="id"
      class="domTree"
      default-expand-all
      :data="domTree.data"
      :props="defaultProps"
      @node-drop="handleDrop"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @node-click="domTreeClick"
      @node-drag-end="handleDragEnd"
      :current-node-key="domTree.key"
      @current-change="domTreeChange"
      @node-drag-over="handleDragOver"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-contextmenu="domTreeContextmenu"
  />
</template>

<script>
export default {
  name: "dom-tree",
  data: function () {
    return {
      domTree: {
        data: [],
        key: ""
      },
      defaultProps: {
        disabled: "",
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    // 初始化
    init(data) {
      this.domTree = data
    },
    // 当前选中节点变化时触发的事件
    domTreeChange(dom, node) {
      console.log(dom, node)
    },
    // 节点被点击
    domTreeClick(data, node, dom) {
      console.log(data, node, dom)
    },
    // 节点被右击
    domTreeContextmenu(event, data, node, dom) {
      console.log(event, data, node, dom)
    },
    // 节点开始拖拽时触发的事件
    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    // 拖拽进入其他节点时触发的事件
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    // 	拖拽离开某个节点时触发的事件
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    // 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    // 拖拽结束时（可能未成功）触发的事件
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    // 拖拽成功完成时触发的事件
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    /**
     * 拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
     * @param draggingNode
     * @param dropNode
     * @param type
     * @returns {boolean}
     */
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    // 判断节点能否被拖拽
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    }
  }
}
</script>
