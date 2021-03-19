// main.js
import Vue from 'vue'
import SvgIcon from 'vue-svgicon'

// Default tag name is 'svgicon'
Vue.use(SvgIcon, {
  tagName: 'svgicon',
  defaultWidth: '1.5rem',
  defaultHeight: '1.5rem',
})

Vue.component('svg-icon', SvgIcon)
