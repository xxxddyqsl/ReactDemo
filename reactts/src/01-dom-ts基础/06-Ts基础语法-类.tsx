/*

*/

class Bus{
    /*
        private ts提供修饰符 -  声明变量为私有属性
        私有属性 外部不可以访问并且就算是子类继承父类Bus 子类也不可以访问使用父类Bus的私有属性  只能Bus类内部使用
        如 下方 obj._list 报错：属性“_list”为私有属性，只能在类“Bus”中访问。
        是无法访问对 _list 变量的 只能在类的内部访问使用
    */
    private _list:Array<any>=[];
    /*
        public ts提供修饰符 声明变量为公有属性
        公有属性   外部可以访问  子类继承父类Bus 子类也可以访问使用父类Bus的公有属性
    */
    public name='Hello, world!'
    /*
        protected ts提供修饰符 声明变量为被保护的对象
        被保护的对象  外部不可以访问 外部访问 报错：属性“age”受保护，只能在类“Bus”及其子类中访问。
        子类继承父类Bus 子类可以访问使用父类Bus的被保护的对象 或 Bus类中内部使用
    */
    protected age=100
    // 订阅
    subscribe(callback:any){
        this._list.push(callback)
    }
    dispatch(){
        this._list.forEach((callback)=>{
            callback&&callback()
        })
    }
}
var obj=new Bus();
// obj._list 外部访问私有属性 报错：属性“_list”为私有属性，只能在类“Bus”中访问。
// console.log(obj._list)
// obj.age 外部访问被保护的对象 报错：属性“age”受保护，只能在类“Bus”及其子类中访问。
// obj.age

console.log(obj)
// 关键字 extends 继承 Class 子类 extends 父类{ }
class Child extends Bus{
    test(){
        /*
            子类 访问父类私有属性_list：
                无法访问  父类Bus的私有属性_list 报错：属性“_list”为私有属性，只能在类“Bus”中访问。
        */
        // console.log(this._list)
        /*
            子类 访问父类的公有属性name：可以访问
        */
        console.log(this.name)
         /*
            子类 访问父类的protected 被保护的对象：可以访问 属性“age”受保护，只能在类“Bus”及其子类中访问。
        */
        console.log(this.age)
    }
}
export default function App() {
    return (
        <div className='app-assembly'>
            <h1>06-Ts基础语法-类</h1>
        </div>
    )
}