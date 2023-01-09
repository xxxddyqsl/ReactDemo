import React from 'react'
import DemoA from './02-css模块化'
// 导入 css 文件 取出 styles 变量 通过styles.warper 取出 index.module.css 文件夹内 被计算重新生成的class名
import styles from './css/index.module.css'
/*
    css模块化 - 解决 某个组件引入 css 容易会污染全局的样式 如某个css文件中 样式为 ul li {color:red} 那当前单页面 全局的ul li 都会被影响

    当组件逐渐增多起来的时候，我们发现，组件的样式也是越来越丰富，这样就很有可能产生两个组件中样式名称有可能会冲突，这样会根据引入App这个组件的先后顺序，后面的会覆盖前面的，

    为了解决这个问题React中还为我们提供了一中方式，CSS Module。

    我们可以将CSS Module理解为外部样式表的一种进化版，它的大部分使用方式都和外部样式表类似，不同点在于使用CSS Module后，网页中元素的类名会自动计算生成并确保唯一，所以使用CSS Module后，我们再也不用担心类名重复了

    使用方式

    CSS Module在React中已经默认支持了（前提是使用了react-scripts），所以无需再引入其他多余的模块。使用CSS Module时需要遵循如下几个步骤：

    1.将css文件名修改： index.css --- > index.module.css
    2.取出 styles 变量 通过 styles.warper 取出 index.module.css 文件夹内 被计算重新生成的class名
   3. 如果想要 某个clss名 或者 样式 不被计算重新生成的class名 就是全局的样式 可以通过 :global 如 index.module.css中的 :global(.win_warper){color: blueviolet;}
    注意： 如果css文件内写的样式是 ul li {color:red} 这种标签选择器 并且不会计算生成新的唯一 样式名 容易会污染全局的ul li样式 当然可通过 class ul li {color:red} 来解决
*/
export default function Test() {
  console.log(styles)
  return (
    <div className={'app-assembly ' + styles.app}>
        <h1>01-css模块化-css互不影响</h1>
        <div className={styles.warper}>index组件使用 - index.module.css的class名: warper</div><br></br>
        <ul><li>通过styles.app - class选择器 优化 标签选择器 不污染全局的ul li样式</li></ul><br></br>
        <div className='win_warper'>全局样式 - 样式名称不被Module计算 保留原样式名</div><br></br>
        <DemoA/>
    </div>
  )
}
