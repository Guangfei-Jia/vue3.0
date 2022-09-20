<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-08-09 15:44:55
 * @LastEditors: fei
 * @LastEditTime: 2022-07-31 10:45:04
-->
# vue3.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# 自动化部署依赖下面两个插件
 npm install archiver ssh2 -D

# 项目优化：预渲染、服务端渲染、骨架屏


# 页面个别页面SEO预渲染、只能处理静态页面，页面无法交互
## 安装依赖
npm install prerender-spa-plugin --save-dev
## 配置文件引入插件并使用，本项目需要注释publicPath才可生效，路由必须是history模式
const path = require('path')
const PrerenderSPAPlugin = require("prerender-spa-plugin");                             // 宣传页SEO,预渲染插件，
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;                                  // 宣传页SEO,预渲染插件；
// 页面预渲染插件处理
config.plugins.push(
    new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "dist"),
        // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
        routes: ["/error/403"],
        renderer: new Renderer({
            inject: {
                foo: "bar"
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: 'render-event',
            renderAfterTime: 5000
        })
    })
)
## 全局添加预编译控制
// mounted(){
//   document.dispatchEvent(new Event ('render-event'))
// }

# 动态添加meta等信息，一般与预渲染同用
npm i vue-meta-info --save-dev
## 引入
import MetaInfo from 'vue-meta-info'
app.use(MetaInfo);
## 使用 在需要改变meta的vue页面添加metaInfo属性
metaInfo: {
    title: 'page1', // set a title
    meta: [{                 // set meta
        name: 'keyWords',
        content: 'My page1 App'
    }],
    link: [{                 // set link
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
    }]
},

# 预渲染插件报错
prerender-spa-plugin/es6/index.js 中line 60；webpack5已经不支持旧的mkdirp ，需要改成mkdir 
puppeteerˌpʌpɪˈtɪə(r)]演木偶戏的人; 操纵木偶的人;
## 原理
prerender-spa-plugin 利用了 Puppeteer 的爬取页面的功能。 Puppeteer 是一个 Chrome官方出品的 headlessChromenode 库。它提供了一系列的 API, 可以在无 UI 的情况下调用 Chrome 的功能, 适用于爬虫、自动化处理等各种场景。它很强大，所以很简单就能将运行时的 HTML 打包到文件中。原理是在 Webpack 构建阶段的最后，在本地启动一个 Puppeteer 的服务，访问配置了预渲染的路由，然后将 Puppeteer 中渲染的页面输出到 HTML 文件中，并建立路由对应的目录

# 骨架屏实现（原理：源码$mount函数挂载，会替换当前非body、html元素）
1、直接将代码写入div#app
2、将 base64 图片 放入div#app
3、使用 .vue 文件来完成骨架屏
4、自动生成（未实践，安装包需要与vue版本对应）  vue-skeleton-webpack-plugin  vue-server-renderer


# 响应api
reactive 一般定义对象  自动解包
readonly 接收对象为只读  自动解包
isProxy 检查对象是否是由 reactive 或 readonly 创建的 proxy
isReactive 检查对象是否是由 reactive 创建的响应式代理。 readonly包裹的reactive也算
isReadonly  检查对象是否是由 readonly 创建的只读代理。
toRaw   返回 reactive 或 readonly 代理的原始对象；于临时读取数据而无需承担代理访问/跟踪的开销，也可用于写入数据而避免触发更改


