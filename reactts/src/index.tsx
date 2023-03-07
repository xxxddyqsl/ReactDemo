import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/utils.css'
// ts基础 + ts在react 类组件 函数组件 状态 + 属性的应用 -demo文件入口
// import App from './App';

// react+ts路由-demo文件独立入口
// import App from './04-demo-ts+router路由/App';

// react+ts+redux状态管理-demo文件独立入口
// import App from './05-demo-ts+redux状态管理/App';

// react+ts+antdMoble组件库 文件独立入口
import App from './06-demo-ts+antdMoble组件库/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // React.StrictMode 严格模式
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
