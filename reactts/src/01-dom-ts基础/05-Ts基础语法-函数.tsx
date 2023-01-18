/*

*/
// 声明 接口
interface fn{
    x:number;
    y:number;
}
// msg 参数 赋fn接口 规定 参数类型形状 并且:number 规定必须有返回值 返回值必须是number类型
function add(msg:fn):number{
    return msg.x+msg.y
}
add({x:1,y:2});
// test():string 函数 必须有返回值 并且返回值必须是字符串 参数b为 用 ? 表示可选的参数
function test(a:string,b?:string):string{
    // 写法 1 如果可选的参数b  没有传 为undefined 的情况手动if判断
    // if(b){  return a.substring(0,1)+b.substring(0,1); }else{  return a.substring(0,1);  }
    // 写法 2 如果可选的参数b 没有传 为undefined 的情况 调用 字符串方法 substring() 截取字符串
    return a.substring(0,1)+b?.substring(0,1);
}
let myname:string = test('aaa','bbb');
console.log(myname);

interface IObj{
    name:string,
    age:number,
    // =>string  规定必须有返回值 并且返回值必须是字符串
    getName?:(a:string)=>string
}
var obj:IObj={
    name:'',
    age:100,
    getName:(a:string)=>{return a.substring(0,3)}
}

console.log(obj.getName?obj.getName('Hello, world!'):'没有可选的getName函数')
export default function App() {
    return (
        <div className='app-assembly'>
            <h1>05-Ts基础语法-函数</h1>
        </div>
    )
}