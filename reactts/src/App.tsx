import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ReactTsA from "./01-dom-ts基础/01-React+Ts介绍安装"
import ReactTsB from "./01-dom-ts基础/02-Ts基础语法-基本类型"
import ReactTsC from "./01-dom-ts基础/03-Ts基础语法-数组"
import ReactTsD from "./01-dom-ts基础/04-Ts基础语法-对象-接口"
import ReactTsE from "./01-dom-ts基础/05-Ts基础语法-函数"
import ReactTsF from "./01-dom-ts基础/06-Ts基础语法-类"
import ReactTsG from "./01-dom-ts基础/07-Ts基础语法-类+接口"
import ReactTsClassA from "./02-dom-ts+react-类组件应用/01-ts+react-类组件-state状态简单应用"
import ReactTsClassB from "./02-dom-ts+react-类组件应用/02-ts+react-类组件-todolist-state状态案例"
import ReactTsClassC from "./02-dom-ts+react-类组件应用/03-ts+react-类组件-props属性简单应用"
import ReactTsClassD from "./02-dom-ts+react-类组件应用/04-ts+react-类组件-抽屉-props属性案例"
import ReactTsFunA from "./03-dom-ts+react-函数组件应用/01-ts+react-函数组件-state状态简单应用"
import ReactTsFunB from "./03-dom-ts+react-函数组件应用/02-ts+react-函数组件-todolist-state状态案例"
import ReactTsFunC from "./03-dom-ts+react-函数组件应用/03-ts+react-函数组件-props属性简单应用"
import ReactTsFunD from "./03-dom-ts+react-函数组件应用/04-ts+react-函数组件-抽屉-props属性案例"
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div>
      <ReactTsA></ReactTsA>
      <ReactTsB />
      <ReactTsC />
      <ReactTsD />
      <ReactTsE />
      <ReactTsF />
      <ReactTsG />

      <ReactTsClassA />
      <ReactTsClassB />
      <ReactTsClassC />
      <ReactTsClassD />
      <ReactTsFunA />
      <ReactTsFunB />
      <ReactTsFunC />
      <ReactTsFunD />
    </div>
  );
}

export default App;
