/*
    react-test-renderer
    介绍 react 官方提供的测试模块

    安装命令如下
    yarn add react-test-renderer

    把一段jsx模板进行 shallow render（浅层的渲染）（如果这个模板里面有套着的孩子组件不会渲染，只会渲染自己第一层的，当然也有 full render （深层的渲染）进行深层的全部渲染）

    创建-测试文件命名规则 如下 (必须以 .test.js 结尾)
    01-react-test-renderer.test.js
*/
/*
    测试文件编写常规语法案例 如下
    describe('react-test-renderer',function(){
        it("app 的名字是 01-单元测试-(react-test-renderer安装)")
    })

    describe  固定的测试文件语法函数 第一个参数 测试描述  第二个参数 回调函数
*/

describe('react-test-renderer',function(){
    it("app 的名字是 01-单元测试-(react-test-renderer安装)",function(){

    })
})