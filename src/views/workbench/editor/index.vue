<template>
  <div class="WorkbenchEditor">
    <Ruler>
      <div class="WorkbenchEditor__main" ref="WorkbenchEditor">
        <!--        on Manual Controller Ready -->
        <froala ref="VueFroala" tag="div" :config="config" v-model="model"/>
        <!--        <froalaView v-model="model"></froalaView>-->
      </div>
    </Ruler>
    <div class="WorkbenchEditor-code">
      <froala-view v-model="model"></froala-view>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Ruler from '@/components/Ruler/ruler.vue'
// vue-froala
import '@/PlugIn/vueFroala/index'

@Component({components: {Ruler}})
export default class WorkbenchEditor extends Vue {
  @Prop() uuid?: string
  FroalaEditor?: null
  //
  model = ''

  config = {
    // events
    events: {},
    codeMirror: true,
    codeMirrorOptions: {
      tabSize: 4
    },
    autofocus: true,
    language: "zh_cn",
    // toolbarInline
    toolbarInline: true,
    // initOnClick
    initOnClick: true,
    // lineBreakerTags: ['div', 'hr', 'br'],
    // toolbarButtons
    toolbarButtons: {
      'moreText': {
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
      },
      'moreParagraph': {
        'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
      },
      'moreRich': {
        'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
      },
      'moreMisc': {
        'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
        'align': 'right',
        'buttonsVisible': 2
      }
    }
  }

  // 失焦事件
  onEditorBlur(...data) {
    console.log(data)
  }

  // 输入事件
  onEditorInput(event: InputEvent) {
    console.log('onEditorInput :>>', event)
  }

  // 点击事件
  onEditorMousedown(event: MouseEvent) {
    // 获取到 dom 元素进行罩层渲染
    console.log('onEditorMousedown :>>', event)
  }

  'onEditorContentChanged'(...data) {
    console.log('content.changed :>> ', ...data)
  }

  onEditorInitialized(_this) {
    // 获取编辑器实例
    this.FroalaEditor = _this
  }

  mounted() {
    this.$nextTick(() => {
      const dom = this.$refs.VueFroala.$el as Element
      // 或许需要等待
      setTimeout(() => {
        const editor = dom.getElementsByClassName('fr-element')[0]
        // 聚焦
        editor.focus()
        // editor.selection.setRangeAtEndOf('p');
      })
    })
  }

  createdEditor() {
    const editorEvent = {}
    // key 转 数组
    const list = Object.keys(this)
    // 字符转换
    const replace = (value: string) => {
      // 首字母小写
      const val = value[0].toLowerCase()
      return val + value.substr(1, value.length)
    }
    // 暴力遍历
    for (const keys of list) {
      const value = keys.match(/^onEditor([\w.]+)$/)
      if (value) {
        // 填充
        const [key, val] = value
        // 收集 -> 释放
        const _this = this as Vue
        editorEvent[replace(val)] = function (...data) {
          // 跳转到 vue 中的方法里，返回编辑器实例，和参数
          _this[key](this, ...data)
        }
      }
    }
    // 赋值
    this.config.events = editorEvent
  }

  onViewJump(func) {
    const viewJump = (uuid?: string) => this.$router.push({path: "/workbench/view" + (uuid || '')})
    // 获取当前路径解析出来的uuid
    const uuid = this.uuid || false
    // 页面展示逻辑
    if (uuid) {
      const state = this.$utils.history.hasHistory(uuid)
      if (state) {
        func(this.$utils.history.getHistory(uuid))
      } else {
        viewJump('/' + uuid)
      }
    } else {
      viewJump()
    }
  }

  created() {
    this.onViewJump(data => {
      // 编辑器初始化
      this.createdEditor()
      // 内容赋值
      this.model = data
    })
  }
}
</script>
<style lang="scss" src="./editor.scss"/>