import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <div className={'gg-flex-1'} style={{ width: '100%', background: 'red', }}>
                <button>返回</button>
                <span style={{flex:'1',textAlign: 'center',}}>顶部导航栏</span>
                <button onClick={()=>{
                    this.props.callback()
                }}>我的</button>
            </div>
        )
    }
}
