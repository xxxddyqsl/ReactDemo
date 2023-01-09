import React, { useState, useEffect } from 'react'
import axios from 'axios'
/*
  配置代理
    方法一：
      在package.json中追加如下配置
      "proxy":"请求的地址"      "proxy":"http://localhost:5000"
      说明：
      优点：配置简单，前端请求资源时可以不加任何前缀。
      缺点：不能配置多个代理。
      工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）

    方法二:
      第一步：创建代理配置文件
      在src下创建配置文件：src/setupProxy.js (注意： 文件名必须是setupProxy.js)

      安装  npm install --save http-proxy-middleware

      第二步：编写setupProxy.js配置具体代理规则

      const proxy = require('http-proxy-middleware')
      module.exports = function(app) {
        app.use(
          proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
            target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
            changeOrigin: true, //控制服务器接收到的请求头中host字段的值

              //changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
              //changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
              //changeOrigin默认值为false，但我们一般将changeOrigin值设为true

              pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
            }),
            proxy('/api2', {
              target: 'http://localhost:5001',
              changeOrigin: true,
              pathRewrite: {'^/api2': ''}
            })
          )
        }

        说明：
        优点：可以配置多个代理，可以灵活的控制请求是否走代理。
        缺点：配置繁琐，前端请求资源时必须加前缀。

    方法三:vite配置proxy  （vite.config.ts）
      import { defineConfig } from 'vite'
      import react from '@vitejs/plugin-react'

      // https://vitejs.dev/config/
      export default defineConfig({
        plugins: [react()],
        server: {
          // 是否自动打开浏览器
          open: true,
          // 代理
          proxy: {
            '/api': {
              target: 'http://127.0.0.1:5000',
              changeOrigin: true,
              rewrite: path => path.replace(/^\/api/, ''),
            },
          },
        },
      })
*/
export default function Test() {
  const [list,setList]=useState([])
  // 跨域
  // const url = 'https://i.maoyan.com/ajax/mostExpected?limit=10&offset=0&token=&optimus_uuid=A30E9EE075DD11EDAB3A8DF53BE79847CFE3B9A361F84A92949ADBBE44BE8D4C&optimus_risk_level=71&optimus_code=10';
  // /api 代理转发 关键字 - 待映接口
  // const url = '/api/ajax/mostExpected?limit=10&offset=0&token=&optimus_uuid=A30E9EE075DD11EDAB3A8DF53BE79847CFE3B9A361F84A92949ADBBE44BE8D4C&optimus_risk_level=71&optimus_code=10';
  // /api 代理转发 关键字 - 热映接口 https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E8%8B%8F%E5%B7%9E&ci=80&channelId=4
  const url= '/api/api/mmdb/movie/v3/list/hot.json?ct=%E8%8B%8F%E5%B7%9E&ci=80&channelId=4'
  useEffect(() => {
    axios({
      url: url,
      method: 'get',
    }).then(res => {
      console.log('反向代理==>',res,res.data.coming);
      // 待映接口 返回
      // if(res.data && res.data.success){
      //   setList(res.data.coming)
      // }
      
      // 热映接口 返回
      if(res.data ){
        setList(res.data.data.hot)
      }
    }).catch(err => {
      console.log(err);
    })
  }, []);
  return (
    <div className='app-assembly'>
      <h1>01-反向代理-跨域请求猫眼数据</h1>
      <ul>
        {
          list.map(item=>{
            return <li key={item.id}>
                <img src={item.img} alt='' style={{width:'200px'}}></img>
                <div>{item.nm}</div>
              </li>
          })
        }
        {list.length<=0&&<div>'猫眼网站接口有 时效 校验 重新获取参数 移动版本-点击 热映 或 待映 按钮 获取接口https://i.maoyan.com/ajax/mostExpected?后面的 最新参数'</div>}
      </ul>
    </div>
  )
}