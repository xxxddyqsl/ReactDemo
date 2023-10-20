import React, { useEffect, useState } from 'react'
import axios from 'axios';
// 导入封装的 公共处理状态 函数 入口文件
import Store from '../../redux/store'

import styles from './Detail.module.css'


// dispatch函数 通知 修改 公共状态 - header 组件状态
const SetHerder = (props) => {
  Store.dispatch({
    type: 'header-leftSlot', value: {
      elem: <button onClick={() => { props.history.go(-1) }}>返回</button>
    }
  })
  Store.dispatch({
    type: 'header-centerSlot', value: {
      elem: <div style={{ fontSize: '16px', fontWeight: 'bold' }}>电影详情</div>
    }
  })
  Store.dispatch({
    type: 'header-rightSlot', value: {
      elem: <button onClick={() => { props.history.push({ pathname: '/' }); }}>首页</button>
    }
  })
}
const Destruction= ()=>{
   // 组件-销毁时 发起 - store.dispatch 通知 显示底部 TabBer 组件  重新修改头部 状态
   Store.dispatch({ type: 'showTabBer', value: true })
   Store.dispatch({  type: 'header-leftSlot', value: { elem: ''  }  })
   Store.dispatch({  type: 'header-centerSlot', value: { elem: ''  }  })
   Store.dispatch({  type: 'header-rightSlot', value: { elem: ''  }  })
}
export default function Index(props) {
  const [info, setInfo] = useState();
  useEffect(() => {
    // 修改公共状态 - header 组件状态
    SetHerder(props)
    // dispatch函数 通知 修改 公共状态 - tabbber 组件状态
    Store.dispatch({ type: 'hideTabBer', value: false })
    // 获取 路由传入的 电影 id
    const { myid } = props.location.state;
    console.log('电影id:', myid)
    // 获取电影 详情
    axios({
      url: 'https://m.maizuo.com/gateway',
      method: 'get',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16678116574822707107528705"}',
        'X-Host': 'mall.film-ticket.film.info'
      },
      params: { filmId: myid, k: 9554269 }
    }).then(res => {
      if (res.data.status === 0) {
        setInfo(res.data.data.film)
      }
      // console.log(res)
    }).catch(err => { console.log(err) })
    return () => {
      // 组件-销毁时 发起 - store.dispatch 通知 显示底部 TabBer 组件
      Store.dispatch({ type: 'showTabBer', value: true })
      Store.dispatch({  type: 'header-leftSlot', value: { elem: ''  }  })
      Store.dispatch({  type: 'header-centerSlot', value: { elem: ''  }  })
      Store.dispatch({  type: 'header-rightSlot', value: { elem: ''  }  })
    }
  }, [])
  return (
    <div className={styles.warper}>
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
