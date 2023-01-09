import React, { useState } from 'react'
// 导入immutable库 Map将普通对象转为 immutable 不可变对象
import { Map } from 'immutable'

/*
    var obj={
        name:'win',
        age:11
    }
    //  使用Map将普通对象转为 immutable 不可变对象
    var oldImmuObj=Map(obj);
    // 修改值的方式-set 返回一个新的的 immutable对象
    var newImmuObj= oldImmuObj.set('age',18);
    // 老的immutable对象 oldImmuObj 为不可变对象 没有受修改值影响
    // console.log(obj,oldImmuObj,newImmuObj)
    // immutable对象 获取值的方式1：get
    console.log('获取值的方式1：get==>',oldImmuObj.get('age'),newImmuObj.get('age'))
    // immutable对象 获取值的方式2：转为普通对象
    console.log('获取值的方式2转为普通对象通过.属性：toJS==>',oldImmuObj.toJS().age,newImmuObj.toJS())

    Map()：JS对象或数组转换成immutable
    浅转换，只转换最外层一级属性 如var data={  name:'win', age:11 ,info:{cc:'1',b:'2'} } info属性还是普通的对象 需要再次使用Map包住 info属性
    增
    Map.set('','') 第一个参数 属性名称 第二个参数修改的值
    如var data={  name:'win', age:11 ,info:{cc:'1',b:'2'} } Map(data).set('name','测试')

    Map.setIn([],'xxx') 第一个参数 数组形式 属性层级   第二个参数修改的值
    如var data={  name:'win', age:11 ,info:{cc:'1',b:'2'} } Map(data).setIn(['info','cc'],'测试')
    注意：setIn可以深层操作，第一个参数是个数组，数组中第一个元素是操作的对象的key值，第二个元素是value值，如果不需要可以不用。以下的map.deleteIn、map.updateIn、map.getIn同理。


    删
    Map.delete('') 要删除的属性
    如var data={  name:'win', age:11 ,info:{cc:'1',b:'2'} } Map(data).delete('name')

    Map.deleteIn([]) 要删除的属性 数组形式 多层级 删除info 里的 属性cc
    如var data={  name:'win', age:11 ,info:{cc:'1',b:'2'} } Map(data).deleteIn(['info','cc'])
    
    改
    Map.update() 参数1：需要更新的值 参数2：回调函数，返回一个更新后的值
    如var data={  name:'win', age:11 ,info:{cc:'1',b:'2'} } Map(data).update('name',(value)=>{if(value>1){return '测试1'}else{return '测试2'}})

    map.updateIn() 深层更新 参数1：一个数组，第一个元素是父元素，第二个元素为目标子元素  参数2：回调函数，参数value为目标值(就是属性cc)的值，返回值为一个更新后的值
    如var data={  name:'win', age:11 ,info:{cc:'1',b:'2'} } Map(data).updateIn(['info','cc'],(value)=>{if(value>1){return '测试1'}else{return '测试2'}})

    查 返回的不是immutable对象了 而是里边定义的正常值
    Map.get('')
    如var data={  name:'win', age:11 ,info:{cc:'1',b:'2'} } Map(data).get('name') 返回'win'

    Map.getIn([])
    如var data={  name:'win', age:11 ,info:{cc:'1',b:'2'} } Map(data).getIn(['info','ccc']) 返回'1'

    toJS()：immutable的 map对象/list对象 转 JS对象/JS数组
*/

export default function Test() {
    //方案1：  在开始时就将-初始状态 使用Map设置为immutable 不可变对象
    const [info, setInfo] = useState(Map({ name: 'Hello World', age: 18 }))
    //方案2：  在开始时初始状态还是普通对象 只是在修改时 使用Map设置为immutable 不可变对象
    const [newinfo, setnewInfo] = useState({ name: 'Hello World', age: 18 });
    const [obj, setObj] = useState({ name: 'world', select: 'aa', add: (num) => { return num++; }, filter: { test: 'immutable多级属性', up: true, down: false } })
    return (
        <div className='app-assembly'>
            <h1>02-immutable-基础-Map-状态是对象使用Map将普通对象转为 immutable 不可变对象 - 深度复制</h1>
            <div style={{ color: 'red' }}>
                {/*   react 修改状态时 不可以直接操作修改状态 需要深度拷贝 在不影响原状态的基础上修改通过深度拷贝新的对象 更新状态 */}
                注：通过Map将普通对象转为 immutable 不可变对象 只能进行一级属性是immutable对象 深度复制 <br></br>
                多级属性里面的值(如filter属性值)还是普通对象并非是immutable对象 这就无法达到预期的不改变原状态内存地址的效果了
                如下格式数据:''
                <button onClick={() => {
                    var obj1 = Map(obj)
                    { console.log('immutable一级属性-是immutable对象==>', obj1, 'immutable多级属性-只是普通对象==>', obj1.get('filter')) }
                }}>click多级属性还是普通对象</button>
                解决方式：在 多级属性里面的值(如filter属性值)再次通过 Map 设置为immutable 不可变对象
                <button onClick={() => {
                    // obj 转为immutable对象
                    var obj1 = Map(obj)
                    // 通过get获取多级属性filter值 此时为普通对象 使用Map将多级属性filter值转为immutable对象 通过set 将已经多级属性filter值转为immutable对象赋值给多级属性filter
                    var obj2 = obj1.set('filter', Map(obj1.get('filter')))
                    console.log(obj1, obj2, 'immutable多级属性-转immutable对象==>', obj2.get('filter'), obj2.get('filter').get('test'))
                    // 修改多级属性filter值
                    var obj3 = obj2.set('filter', obj2.get('filter').set('test', '测试修改').set('up', false).set('down', true));

                    // 可使用 obj2.get('filter')===obj3.get('filter') 判断值是否发生改变  true 未发生改变 在class类组件 生命周期 shouldComponentUpdate中 进行性能优化 return false 不允许更新 提高性能 
                    // console.log(obj2.get('filter')===obj3.get('filter'),obj2,obj3)

                    //immutable对象转为普通对象 - 更新状态
                    setObj(obj3.toJS())
                    console.log(obj)

                }}>解决click多级属性还是普通对象</button>
            </div>
            <div style={{ border: '1px solid red', margin: '10px', padding: '10px' }}>
                <h3>方案1：  在开始时就将-初始状态 使用Map设置为immutable 不可变对象</h3>
                <button onClick={() => {
                    // 修改多个在 可在后面连接多个.set 链式操作
                    setInfo(info.set('name', 'xiaoming').set('age', 100))
                }}>click修改</button>
                <div>
                    immutable对象 获取值的方式1：get()-
                    {info.get('name')}---{info.get('age')}
                </div>
                <div>
                    immutable对象 获取值的方式2：toJS()-转为普通对象-
                    {JSON.stringify(info.toJS())}---{info.toJS().name}---{info.toJS().age}
                </div>
            </div>
            <div style={{ border: '1px solid red', margin: '10px', padding: '10px' }}>
                <h3>方案2：  在开始时初始状态还是普通对象 只是在修改时 使用Map设置为immutable 不可变对象</h3>
                <button onClick={() => {
                    // 使用Map设置为immutable 不可变对象
                    var obj = Map(newinfo);
                    // 通过set修改immutable对象 修改多个在 可在后面连接多个.set 链式操作
                    var newobj = obj.set('name', 'xiaoming').set('age', 100)
                    // 通过 toJS 将immutable对象 转为普通对象 并且更新状态
                    setnewInfo(newobj.toJS())
                }}>click修改</button>
                <div>
                    原react 获取状态方式--
                    {newinfo.name}---{newinfo.age}
                </div>
            </div>
        </div>
    )
}
