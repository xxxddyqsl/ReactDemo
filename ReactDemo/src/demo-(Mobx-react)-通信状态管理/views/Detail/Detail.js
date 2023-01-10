import React, { useEffect, useState } from 'react'
// css 模块化 与其他css隔离
import styles from './Detail.module.css'
import axios from 'axios'
// 导入 创建 声明好的 mobx
import Store from '../../mobx/store'
/*
    导入 mobx
    observable 把一个普通 Number 对象 数组等类型的数据 转换成可观察的数据 每次修改这个值的时候 就会在 autorun自动执行函数 中监听触发

    observable 转换成可观察的数据
    autorun 监听 类似订阅 需要取消订阅
*/
import { autorun } from 'mobx'
export default function Detail(props) {
    const [info, setInfo] = useState();
    const id = props.match.params.myid;
    // 获取电影详情
    useEffect(() => {
        // 开启严格模式 不直接通过Store.hiddenTabBer 修改observable可观察对象 集中 在 store.js 中管理处理数据 保证代码风格统一 降低耦合度
        // Store.hiddenTabBer = false
        Store.changeHide()
        console.log(props.location.state)
        axios({
            url: 'https://m.maizuo.com/gateway',
            method: 'get',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705"}',
                'X-Host': 'mall.film-ticket.film.info'
            },
            params: { filmId: id, k: 9554269 }
        }).then(res => {
            if (res.data.status === 0) {
                setInfo(res.data.data.film)
            }
            // console.log(res)
        }).catch(err => { console.log(err) })

        //useEffect没有注入任何依赖传入空数组  组件-销毁时触发 return ()=>{} 只执行一次
        return () => {
            // 开启严格模式 不直接通过Store.hiddenTabBer 修改observable可观察对象 集中 在 store.js 中管理处理数据 通过方法修改observable可观察对象 保证代码风格统一 降低耦合度
            // Store.hiddenTabBer = true
            Store.changeShow()
        }
    }, [])
    return (
        <div className={styles.warper}>
            Detail
            {
                info ? <div>
                    <img src={info.poster} alt='' style={{ width: '160px' }} />
                    <h4>{info.name}</h4>
                    <div>{info.nation}</div>
                    <div>{info.synopsis}</div>
                </div> : '没有查询到数据'
            }
        </div>
    )
}
