import React, { Component, useState, useEffect } from 'react'
// 校验  props属性 类型
import kerwinPropsType from 'prop-types'
function NewField(props) {
    // inpVal默认值 赋空值
    const [inpVal, setValue] = useState('');
    // 函数组件 - 状态值异步 - 使用useEffect 获取 状态的最新值
    useEffect(() => {
        console.log(inpVal); // 这里是监控到的最新值
    }, [inpVal]);
    return (
        <div>
            <label>{props.label}</label>
            <props.Tagname type={props.type} onChange={(event) => {
                setValue(event.target.value)
                console.log(inpVal)
            }}></props.Tagname>
        </div>
    )
}

//函数组件 -  设置默认 props属性 默认值 （父组件未传入时默认值有效）
NewField.defaultProps = {
    Tagname: 'input'
}
// 函数组件 - 校验父组件传入 props属性 类型
NewField.propTypes = {
    //自定义函数校验 props属性 类型  props是父组件传入的所有props属性，propName(如：'Tagname')是prop的属性名，componentName是props所在的组件名称(如：'Field')
    Tagname: (props, propName, componentName) => {
        // console.log(props,propName,componentName)
        if (typeof props[propName] === 'string') {
            if (props[propName] !== 'input' && props[propName] !== 'textarea') {
                return new Error(props[propName] + '非表单标签')
            }
        } else {
            return new Error(propName + '参数非字符串')
        }
    },
    label: kerwinPropsType.string,
}
/*
    上方 NewField 函数组件 在下方 Test 类组件中获取函数 子组件的ref时 this.username.current返回null 暂时未学到函数组件 现无法解决
    使用下方 类组件方案
*/

//临时改为 备用 类组件方案
class Field extends Component {
    state = {
        value: ''
    }
    // 可给 调用者（如：父组件）通过ref获取实例化子组件的方式 或者自己this.clear() 调用
    clear() {
        // 清空 value状态
        this.setState({
            value: ''
        })
    }
    // 可给 调用者（如：父组件）通过ref获取实例化子组件的方式 或者自己this.setValue('ccc') 调用
    setValue(val) {
        this.setState({
            value: val
        })
    }
    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <this.props.Tagname type={this.props.type} value={this.state.value} onChange={(event) => {
                    this.setState({
                        value: event.target.value
                    })
                    // console.log(this.state.value)
                }}></this.props.Tagname>
            </div>
        )
    }
}
// 类组件
export default class Test extends Component {
    username = React.createRef();
    password = React.createRef();
    render() {
        return (
            <div className='app-assembly'>
                <h1>05-ref版-表单域组件</h1>
                <div>登录页</div>
                {/* 传入 this.state.username 状态值 完全控制子组件input的value 父组件点击控制清空输入框时调用 */}
                <Field label='用户名' type='text' Tagname='input' ref={this.username} ></Field>
                <Field label='密码' type='password' Tagname='input' ref={this.password} ></Field>
                {/* <Field label='测试校验传入子组件的属性校验'  Tagname='div' callbackChange={(value) => {
                    console.log(value)
                }}></Field> */}
                <button onClick={() => {
                    // 通过ref 获取子组件的实例化对象
                    console.log(this.username.current, '获取密码:' + this.password.current.state.value)
                }}>登录</button>
                {/* 清空 username + password 状态改变 React更新 子组件重新渲染 获取父组件传入的状态值 */}
                <button onClick={() => {
                    //通过ref 获取子组件的实例化对象 并且调用 子组件的更新状态setState方法 修改子组件的状态val
                    // 写法1 直接通过this.username.current.取子组件的setState方法
                    this.username.current.setState({
                        value: ''
                    })
                    // 写法2 子组件内部 封装一个清空 函数 父组件通过 this.password.current 实例化对象调用这个clear清空函数:
                    this.password.current.clear();
                }}>重置</button>

                <button onClick={() => {
                    //通过ref 获取子组件的实例化对象 并且调用 子组件的更新状态setState方法 修改子组件的状态val
                    // 写法1 直接通过this.username.current.取子组件的setState方法
                    this.username.current.setState({
                        value: '测试name名'
                    })
                    // 写法2 子组件内部 封装一个清空 函数 父组件通过 this.password.current 实例化对象调用这个clear清空函数:
                    this.password.current.setValue('测试密码');
                }}>修改子组件状态</button>
            </div>
        )
    }
}
