import React, { Component } from 'react'
// 校验  props属性 类型
import kerwinPropsType from 'prop-types'
function Field(props) {
    return (
        <div>
            <label>{props.label}</label>
            <props.Tagname type={props.type} onChange={(event) => {
                props.callbackChange(event.target.value)
            }} value={props.value}></props.Tagname>
        </div>
    )
}
//函数组件 -  设置默认 props属性 默认值 （父组件未传入时默认值有效）
Field.defaultProps = {
    Tagname:'input'
} 
// 函数组件 - 校验父组件传入 props属性 类型
Field.propTypes = {
    //自定义函数校验 props属性 类型  props是父组件传入的所有props属性，propName(如：'Tagname')是prop的属性名，componentName是props所在的组件名称(如：'Field')
    Tagname:(props,propName,componentName)=>{
        // console.log(props,propName,componentName)
        if(typeof props[propName] === 'string'){
            if( props[propName] !== 'input' && props[propName] !=='textarea' ){
                return new Error(props[propName]+'非表单标签')
            }
        }else{
            return new Error(propName+'参数非字符串')
        }
    },
    label:kerwinPropsType.string,

}
// 类组件
export default class Test extends Component {
    state={
        username:'',
        password:'',
    }
    render() {
        return (
            <div className='app-assembly'>
                <h1>04-父子通信版-表单域组件</h1>
                <div>登录页</div>
                {/* 受控组件 传入 this.state.username 状态值 完全控制子组件input的value 父组件点击控制清空输入框时调用 */}
                <Field label='用户名' type='text' Tagname='input' value={this.state.username} callbackChange={(value) => {
                    // console.log(value)
                    this.setState({
                        username:value
                    })
                }}></Field>
                <Field label='密码' type='password' Tagname='input' value={this.state.password} callbackChange={(value) => {
                    // console.log(value)
                    this.setState({
                        password:value
                    })
                }}></Field>
                {/* <Field label='测试校验传入子组件的属性校验'  Tagname='div' callbackChange={(value) => {
                    console.log(value)
                }}></Field> */}
                <button onClick={()=>{
                    console.log(this.state.username,this.state.password)
                }}>登录</button>
                {/* 清空 username + password 状态改变 React更新 子组件重新渲染 获取父组件传入的状态值 */}
                <button onClick={()=>{
                     this.setState({
                        username:'',
                        password:'',
                    })
                }}>重置</button>
            </div>
        )
    }
}
