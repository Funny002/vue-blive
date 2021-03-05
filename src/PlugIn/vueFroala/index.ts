import Vue from 'vue'

require('froala-editor/js/froala_editor.pkgd.min.js')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('froala-editor/css/froala_style.min.css')
//
require('froala-editor/js/plugins/code_view.min')
require('froala-editor/css/plugins/code_view.min.css')
//
require('froala-editor/js/languages/zh_cn')
// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'

Vue.use(VueFroala)