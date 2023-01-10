/*
    导入 mobx
    observable 把一个普通 Number 对象 数组等类型的数据 转换成可观察的数据 每次修改这个值的时候 就会在 autorun自动执行函数 中监听触发

    observable 转换成可观察的数据
    autorun 监听

    开启严格模式作用 ：防止 过于自由,Mobx提供的约定及模板代码很少，代码编写自由，如果不做一些约定，比较容易导致团队代码风格不统一

    action,runInAction和严格模式（configure）

    action ：开启严格模式后必须在 action 中修改 observable 转换成可观察的数据
    runInAction ：解决异步问题

    configure({
        never 不使用严格模式
        always 开启严格模式 ， 开启严格模式后必须在 action 中修改 observable 转换成可观察的数据
        enforceActions:"always"
    })
*/
import { observable, configure, action, decorate, runInAction } from 'mobx'
import axios from 'axios'
configure({
    // 开启严格模式
    enforceActions: 'always'
})
// 老的写法
const store = observable({
    hiddenTabBer: true,
    list: [],
    cityId: '',
    CityName: '北京',
    changeShow() {
        this.hiddenTabBer = true
    },
    changeHide() {
        this.hiddenTabBer = false
    },
    setList(msg) {
        this.list = msg
    },
    setCityId(id) {
        this.cityId = id
    },
    setCityName(name) {
        this.CityName = name
    },
    getList(cityId) {
        // 或者 通过 async await 方案 解决异步
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'GET',
            params: {
                cityId: cityId,
                ticketFlag: 1,
                k: 584748,
            },
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            },
        }).then(res => {
            if (res.data.status === 0) {
                //runInAction ：解决mobx异步问题 如ajax请求
                runInAction(() => {
                    this.list = res.data.data.cinemas
                })
            }
        }).catch(err => {
            console.log(err)
        })
    },
}, {
    changeShow: action,//标记方法是 action 专门用来修改 observable 转换成可观察的数据
    changeHide: action,
    setList: action,
    setCityId: action,
    setCityName: action,
    getList: action,
})

// 新的写法 通过类
/* @ 装饰器语法 @表示增强的 一种特殊的语法规范 需要配置 支持装饰器语法
       1. vscode 设置中 搜索 experimentalDecorators 开启
       2. 安装 第三方模块 npm i @babel/core  @babel/plugin-proposal-decorators @babel/preset-env
       3. 创建 .babelrc 文件 配置如下
       {
           "presets":[
               "@babel/presets-env"
           ],
           "plugins":[
               [
                   "@babel/plugin-proposal-decorators",
                   {
                       "legacy":true
                   }
               ]
           ]
       }
       4.创建 config-overrides.js 文件 配置如下
       const path = require("path")
       const { override, addDecoratorsLegacy } = require("customize-cra")
       function resolve(dir) {
           return path.join(__dirname, dir)
       }
       const customize = () => (config, env) => {
       config.resolve.alias['@'] = resolve('src')
           if(env === "production"){
               config.externals = {
                   'react':'React',
                   'react-dom':'ReactDom'
               }
           }
           return config
       }
       module.exports = override(addDecoratorsLegacy(),customize())
       5. 安装依赖 npm i customize-cra react-app-rewired
       6. 修改 package.json 文件配置
       "scripts": {
           "start":  :"react-app-rewired start",
           // "start": "node scripts/start.js",
           "build":  :"react-app-rewired build",
           // "build": "node scripts/build.js",
            "test":  :"react-app-rewired test",
           // "test": "node scripts/test.js"
       },
       7.如果安装出现问题 可以将node_modules文件删掉 整体重新安装 或者 删除 package-lock.json文件 （此文件会锁定版本）
   */
/*class Store {
    @observable hiddenTabBer = true
    @observable list = []
    @observable cityId = ''
    @observable CityName = ''
    @action changeShow(){
        this.hiddenTabBer = true
    }
    @action changeShow(){
        this.changeHide = false
    }
}
// 通过 实例化 导出 Store类
const store = new Store()*/
export default store