import React, { Component } from 'react'

// function Example(props){
//     return (
//       <div >
//         <input type='text' ref={props.ref} ></input>
//       </div>

//     )
// }

// 关于 state 状态 会在demo 06-state+setState类状态的更新应用.js 中进一步演示
class Example extends Component {
  myText = '';
  state = {
    myText2: '',
    myText3: '1',
  }
  render() {
    return (
      <div>
        <div>
        <div> 获取元素方式1： 通过 React.createRef() 的方式  父组件传入 ref（myRef） 及 传入的函数 (getInpV()) :</div>
          {/* 获取  元素 方式1： 通过 React.createRef() 的方式 */}
          <input type='text' ref={this.props.inpEvt}></input>
          {/* 子调用父组件传入 的回调函数  */}
          <button onClick={() => { this.props.callback() }}>ref==={'>'}获取元素方式1</button>
        </div>
        <div>
          <div> 获取元素方式2 : 通过ref内部 箭头函数</div>
          {/* 获取元素方式2：  通过ref内部 箭头函数 获取 默认参数 event 指向元素自身 */}
          <input type='text' className='myText' ref={(event) => { this.myText = event; }}></input>
          {/* 需要通过 setState + state 更新状态 值才能回渲染到页面 如下 输出this.myText.value 控制台 可见值 页面却没有渲染出 (个人理解：通过修改state状态 告诉react 数据改变了 react自己会重新渲染dom  不操作dom 只改变数据) */}

          <div>
            {/* 例：未使用 setState + state 更新状态 下方dom中的  'myText:' {this.myText.value} 无法显示 但是控制台值 可见input的值*/}
            <button onClick={() => { console.log('无法重新渲染dom==>',this.myText.value) }}>ref==={'>'}获取元素方式2：且未使用 setState + state 更新状态 </button>
            'myText:' {this.myText.value}
          </div>
          {/* 例：使用 setState + state 更新状态 下方dom中的  'myText2:' {this.myText.myText2} 以及上方的 'myText:' {this.myText.value} 都在页面可见 根据状态 react自己重新渲染了dom */}
          <div>
            <button onClick={() => { this.setState({ myText2: this.myText.value }); }}>ref==={'>'}获取元素方式2：使用 setState + state 更新状态</button>
            'myText2:'
            {this.state.myText2}
          </div>
        </div>
        <br/>
        <div>
          <div> 获取元素方式3 : 受控组件 - 双向绑定1</div>
          {/* 如：input 存在 初始默认值  将默认值设置在state状态myText3中 将状态myText3赋值给input value onChange监听setState修改 myText3状态 触发组件更新 将myText3重新赋值个input value  */}
          <input type='text'  value={this.state.myText3} onChange={(ele)=>{
            this.setState({myText3:ele.target.value})
          }}/>
          <div>双向绑定：{this.state.myText3}</div>

        </div>

      </div>
    )
  }

}
export default class testRef extends Component {
  constructor(props) {
    super(props)//super函数 是继承Test 类的所有成员属性 和方法
    // React.createRef()（react v16 新提出）
    // 通过 constructor 构造函数中创建，this.自定义属性名 = React.createRef()
    // 通过 ref={this.自定义属性名} 绑定
    // 通过 this.自定义属性名.current 来获取 dom 元素
    // 注意：必须在类组件中才可使用
    this.myRef = React.createRef();
    this.state = {
      InputEvent: ''
    }
  }
  render() {
    return (
      <div className='app-assembly'>
        <h1> 05-ref的应用</h1>
        {/* 获取标签元素的inpEvt属性名传入子组件 绑定在子组件内的input身上 callback 匿名函数 传入子组件 子组件内按钮点击触发*/}
        <Example inpEvt={this.myRef} inpVal={this.state} callback={() => this.getInpV()} ></Example>
        InputEvent:{this.state.InputEvent}
      </div>
    )
  }
  getInpV = () => {
    //更新 input的值
    this.setState({
      InputEvent: this.myRef.current.value
    })
    // console.log(this.myRef.current.value)
  }
}
