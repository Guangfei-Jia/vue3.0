import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

//引入vue-router和vuex
import router from './router'
import { store, key } from '@/store/index'
// 传入 injection key
app.use(store, key)
app.use(router);

//引入element,控制中文展示
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'element-plus/lib/theme-chalk/index.css';
app.use(ElementPlus, { locale });

//引入svg
import BaseSvgIcon from '@/components/BaseSvgIcon.vue'; // svg组件
// 全局注册
app.component('svg-icon', BaseSvgIcon);
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
const req = require.context('@/assets/icons/svg', false, /\.svg$/);
requireAll(req);

//修改全局message函数
import { message } from '@/utils/utils';
// app.config.globalProperties.$message = message;         //修改this.$message函数
app.provide('$message', message)  //使用依赖注入代替globalProperties，因为在setup中无法使用this调用globalProperties


//引入全局自定义指令directive
// import { directive } from '@/utils/directive'
// directive(app);
import { imgExist } from '@/utils/utils';
app.directive('real-img', async (el, binding) => {
  let imgUrl = binding.value;
  if (imgUrl) {
    let effect = await imgExist(imgUrl);
    if (effect) {
      el.setAttribute('src', imgUrl);
    }
  }
})
//判断按钮权限指令，没有权限移除按钮元素
app.directive('has', async (el, binding, vnode) => {
  let array = (<any>binding).instance.$route.meta.info.children;
  let hasArray = array.filter((item: { name: string }) => {
    return item.name == el.textContent;
  })
  if (hasArray.length <= 0) {
    el.parentNode.removeChild(el);
  }
})

// v-dialogDrag: 弹窗拖拽,
// 使用案例：
/* <el-dialog :visible.sync="dialogshow" center v-dialogDrag :close-on-click-modal='false' @close='dialog_close'>
</el-dialog> */
app.directive('dialogDrag', async (el, binding, vnode) => {
  const dialogHeaderEl = el.querySelector('.el-dialog__header'),//获取弹窗标题部分
    dragDom = el.querySelector('.el-dialog'),
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

  dialogHeaderEl.style.cursor = 'move';  //设置标题部分可被拖拽交叉箭头效果
  dialogHeaderEl.onmousedown = (e: { clientX: number, clientY: number }) => {
    // 鼠标按下，计算当前元素距离可视区的距离
    const disX = e.clientX - dialogHeaderEl.offsetLeft
    const disY = e.clientY - dialogHeaderEl.offsetTop

    // 获取到的值带px 正则匹配替换
    let styL: number, styT: number

    // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
    if (sty.left.includes('%')) {
      styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
      styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
    } else {
      styL = +sty.left.replace(/\px/g, '')
      styT = +sty.top.replace(/\px/g, '')
    }

    document.onmousemove = function (e) {
      // 通过事件委托，计算移动的距离
      const l = e.clientX - disX
      const t = e.clientY - disY

      // 移动当前元素
      dragDom.style.left = `${l + styL}px`
      dragDom.style.top = `${t + styT}px`

      // 将此时的位置传出去
      // binding.value({x:e.pageX,y:e.pageY})
    }

    document.onmouseup = function (e) {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
})
app.directive('highlight', {
  beforeMount(el, binding, vnode) {
    el.style.background = binding.value
  }
})
//完整的自定义指令示例
app.directive('test', {
  created(el, binding, vnode, prevVnode) {
    console.log(`当前元素：${el}`)
    console.log(`虚拟节点：${vnode}`)
    console.log(`上一个虚拟节点：${prevVnode}`)
    console.log(`使用指令的组件实例${binding.instance}`)
    console.log(`先前的值，仅在 beforeUpdate 和 updated 中可用:${binding.oldValue}`)
    console.log(`指令绑定的值：${binding.value}`)
    console.log(`指令:绑定的参数：${binding.arg}`)
    console.log(`指令修饰符对象：${binding.modifiers}`)
  }, // 新增
  beforeMount() { },
  mounted() { },
  beforeUpdate() { }, // 新增
  updated() { },
  beforeUnmount() { }, // 新增
  unmounted() { }
})
const myDirective = app.directive('test');//获取自定义指令定义

// 注册 (功能指令)
app.directive('my-directive', () => {
  // 这将被作为 `mounted` 和 `updated` 调用
})
app.config.errorHandler = (err, vm, info) => {
  //全局捕获错误，避免应用崩溃。
  //捕获组件生命周期钩子里的错误；捕获 Vue 自定义事件处理函数内部的错误；DOM 监听器内部抛出的错误；promise错误等
  //`info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  console.log(err)
  console.log(info)
}
app.config.warnHandler = function (msg, vm, trace) {
  //全局捕获警告信息
  // `trace` 是组件的继承关系追踪，方便追溯问题所在
  console.log(trace)
}
//挂载实例
app.mount('#app')
