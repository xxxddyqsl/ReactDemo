/*
    使用 接口定义好类型 约束 类
*/
// 声明 接口 只约束 写公共用到的方法或者属性的
interface Ifunc {
    // 返回值 必须是字符串
    getName:()=>string
}
/*
    implements 实现interface接口的形状  用来约束 类
    class AAA implements Ifunc
    implements 是要实现Ifunc接口的形状 类AAA 中必须包含一个 getName 函数并且 返回值 必须是字符串
*/
 
class AAA implements Ifunc {
    test1(){

    }
    test2(){

    }
    getName(){
        return 'AAA'
    }
}
class BBB implements Ifunc {
    test1(){

    }
    test2(){

    }
    getName(){
        return 'BBB'
    }
}
// init 函数参数 必须符合 Ifunc  interface接口约束的形状
function init(obj:Ifunc){
    obj.getName()
}
var objA=new AAA();
var objB=new BBB();
init(objA)
init(objB)
export default function App() {
    return (
        <div className='app-assembly'>
            <h1>07-Ts基础语法-类+接口</h1>
        </div>
    )
}