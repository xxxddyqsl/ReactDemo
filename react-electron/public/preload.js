const { contextBridge, ipcRenderer ,IpcRendererEvent } = require('electron')
const { APPDATA } = process.env;
/*
    contextBridge.exposeInMainWorld 函数
    第一个参数 暴露出去的变量名 (页面中使用) 第二个参数是一个对象 要暴露出去的变量或函数
*/
contextBridge.exposeInMainWorld('electron', {
    versions:process.versions,
    appDataPath: APPDATA,
    /*
        渲染进程 和 主进程 之间 IPC 通信
        在主进程中可以使用 ipcMain.handle异步通信 或ipcMain.on()同步通信  设置一个主进程处理程序（handler）然后在预处理脚本中暴露一个被称为 ipcRenderer.invoke 的函数来触发该处理程序（handler）。
        ipcRenderer.invoke('ping',data)的函数来。第一个参数 为字符串 和主进程 约定好的规则 如（'ping'）。 第二个参数是可以是任意类型 数据
        模式 1： 渲染器进程到主进程（双向） 进程之间通信设置-通信接收器  接收主进程发送给渲染进程的消息 首先，在预处理脚本中设置 invoke 调用：
    */
    sendMessage:(channel,...args)=>ipcRenderer.invoke(channel,...args)
});
